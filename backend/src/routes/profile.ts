import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { Env } from "@/types";
import { decodeAuth0Token, extractBearerToken, verifyUserAuthorization } from "@/lib/jwt";

// リクエストスキーマ
const UpdateProfileSchema = z.object({
  name: z.string().optional(),
  bio: z.string().max(500).optional(), // 自己紹介は最大500文字
});

const GetProfileSchema = z.object({
  userId: z.string(),
});

const GetProfileBodySchema = z.object({
  user: z.object({
    email: z.string().email().max(255),
    name: z.string().max(100).optional(),
    picture: z.string().url().optional(),
  }).optional(),
});

/**
 * ユーザー情報がJWTトークンと一致するかを検証
 */
function validateUserInfoAgainstToken(
  userInfo: { email: string; name?: string; picture?: string }, 
  tokenUser: { email?: string; name?: string; picture?: string }
): boolean {
  // メールアドレスが一致するかチェック（最重要）
  if (tokenUser.email && userInfo.email !== tokenUser.email) {
    console.warn('Email mismatch:', { provided: userInfo.email, token: tokenUser.email });
    return false;
  }
  
  // 名前が提供されている場合はチェック
  if (tokenUser.name && userInfo.name && userInfo.name !== tokenUser.name) {
    console.warn('Name mismatch:', { provided: userInfo.name, token: tokenUser.name });
    return false;
  }
  
  return true;
}

const app = new Hono<{ Bindings: Env }>();

// プロフィール取得（POSTでユーザー情報を受け取る）
app.post(
  "/:userId/get",
  zValidator("param", GetProfileSchema),
  zValidator("json", GetProfileBodySchema),
  async (c) => {
    try {
      let { userId } = c.req.valid("param");
      const { user: userInfo } = c.req.valid("json");
      
      // URLデコードを実行
      userId = decodeURIComponent(userId);
      console.log('Decoded userId:', userId);
      console.log('User info from request body:', userInfo);
      
      const authHeader = c.req.header("Authorization");
      console.log('Auth header received:', authHeader ? 'Present' : 'Missing');
      
      const adapter = new PrismaD1(c.env.DB);
      const prisma = new PrismaClient({ adapter });

      let user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          avatar: true,
          createdAt: true,
        },
      });

      // ユーザーが存在しない場合は、リクエストボディまたはJWTトークンから情報を取得して作成
      if (!user) {
        let userEmail = `${userId}@temp.com`; // デフォルト値
        let userName: string | undefined;
        
        // JWTトークンから認証済みユーザー情報を取得
        const token = extractBearerToken(authHeader);
        let tokenUser: { email?: string; name?: string; picture?: string } | null = null;
        
        if (token) {
          tokenUser = decodeAuth0Token(token);
          console.log('Decoded user from JWT:', tokenUser);
        }
        
        // リクエストボディのユーザー情報を検証
        if (userInfo) {
          if (tokenUser) {
            // JWTトークンとリクエストボディの情報を照合
            if (validateUserInfoAgainstToken(userInfo, tokenUser)) {
              userEmail = userInfo.email;
              userName = userInfo.name;
              console.log('Creating user with validated info from request body:', { email: userEmail, name: userName });
            } else {
              console.warn('User info validation failed, using token info');
              userEmail = tokenUser.email || `${userId}@temp.com`;
              userName = tokenUser.name;
            }
          } else {
            console.warn('No token provided, cannot validate user info. Using fallback.');
            // トークンがない場合は信頼できないため、フォールバック値を使用
            userEmail = `${userId}@temp.com`;
            userName = undefined;
          }
        } else if (tokenUser) {
          // リクエストボディにユーザー情報がない場合はトークンから取得
          userEmail = tokenUser.email || `${userId}@temp.com`;
          userName = tokenUser.name;
          console.log('Creating user with info from token:', { email: userEmail, name: userName });
        } else {
          console.log('No token and no user info provided, using fallback email');
        }
        
        user = await prisma.user.create({
          data: {
            id: userId,
            email: userEmail,
            name: userName,
          },
          select: {
            id: true,
            email: true,
            name: true,
            bio: true,
            avatar: true,
            createdAt: true,
          },
        });
      }

      return c.json(user);
    } catch (error) {
      console.error("プロフィール取得エラー:", error);
      return c.json({ error: "サーバーエラーが発生しました" }, 500);
    }
  }
);

// 既存のGETエンドポイント（下位互換性のため）
app.get(
  "/:userId",
  zValidator("param", GetProfileSchema),
  async (c) => {
    try {
      let { userId } = c.req.valid("param");
      // URLデコードを実行
      userId = decodeURIComponent(userId);
      console.log('Decoded userId:', userId);
      
      const authHeader = c.req.header("Authorization");
      console.log('Auth header received:', authHeader ? 'Present' : 'Missing');
      
      const adapter = new PrismaD1(c.env.DB);
      const prisma = new PrismaClient({ adapter });

      let user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          avatar: true,
          createdAt: true,
        },
      });

      // ユーザーが存在しない場合は、JWTトークンから情報を取得して作成
      if (!user) {
        const token = extractBearerToken(authHeader);
        let userEmail = `${userId}@temp.com`; // デフォルト値
        let userName: string | undefined;
        
        console.log('Token extracted:', token ? 'Present' : 'Missing');
        
        if (token) {
          const decodedUser = decodeAuth0Token(token);
          console.log('Decoded user from JWT:', decodedUser);
          if (decodedUser) {
            userEmail = decodedUser.email || `${userId}@temp.com`;
            userName = decodedUser.name;
            console.log('Creating user with decoded info:', { email: userEmail, name: userName });
          }
        } else {
          console.log('No token provided, using fallback email');
        }
        
        user = await prisma.user.create({
          data: {
            id: userId,
            email: userEmail,
            name: userName,
          },
          select: {
            id: true,
            email: true,
            name: true,
            bio: true,
            avatar: true,
            createdAt: true,
          },
        });
      }

      return c.json(user);
    } catch (error) {
      console.error("プロフィール取得エラー:", error);
      return c.json({ error: "サーバーエラーが発生しました" }, 500);
    }
  }
);

// プロフィール更新
app.put(
  "/:userId",
  zValidator("param", GetProfileSchema),
  zValidator("json", UpdateProfileSchema),
  async (c) => {
    try {
      let { userId } = c.req.valid("param");
      // URLデコードを実行
      userId = decodeURIComponent(userId);
      console.log('Update - Decoded userId:', userId);
      
      // 認証チェック
      const authHeader = c.req.header("Authorization");
      const token = extractBearerToken(authHeader);
      
      if (!token) {
        return c.json({ 
          error: "認証トークンが必要です。他のユーザーのプロフィールは編集できません。" 
        }, 401);
      }
      
      // JWTからユーザー情報を取得（本番環境では verifyAuth0Token を使用）
      const decodedUser = decodeAuth0Token(token);
      // 本番環境では以下を使用:
      // const decodedUser = await verifyAuth0Token(token, c.env.EXPO_PUBLIC_AUTH0_DOMAIN);
      if (!decodedUser || !decodedUser.sub) {
        return c.json({ 
          error: "無効な認証トークンです。" 
        }, 401);
      }
      
      // ユーザー認可チェック（自分のプロフィールのみ編集可能）
      if (!verifyUserAuthorization(userId, decodedUser.sub)) {
        console.warn('Authorization failed:', { requestedUserId: userId, tokenSub: decodedUser.sub });
        return c.json({ 
          error: "他のユーザーのプロフィールは編集できません。" 
        }, 403);
      }
      
      const { name, bio } = c.req.valid("json");
      
      // 入力値のサニタイゼーション
      const sanitizedName = name?.trim();
      const sanitizedBio = bio?.trim();
      
      // バリデーション
      if (sanitizedName !== undefined && sanitizedName.length > 100) {
        return c.json({ error: "名前は100文字以内で入力してください" }, 400);
      }
      
      if (sanitizedBio !== undefined && sanitizedBio.length > 500) {
        return c.json({ error: "自己紹介は500文字以内で入力してください" }, 400);
      }
      
      const adapter = new PrismaD1(c.env.DB);
      const prisma = new PrismaClient({ adapter });

      // ユーザーが存在するかチェック
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return c.json({ error: "ユーザーが見つかりません" }, 404);
      }

      // プロフィール更新
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(sanitizedName !== undefined && { name: sanitizedName }),
          ...(sanitizedBio !== undefined && { bio: sanitizedBio }),
        },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          avatar: true,
          updatedAt: true,
        },
      });

      return c.json(updatedUser);
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
      return c.json({ error: "サーバーエラーが発生しました" }, 500);
    }
  }
);

export default app;
