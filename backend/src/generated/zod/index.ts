import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','bio','avatar','createdAt','updatedAt']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','content','imageUrl','latitude','longitude','address','isPublic','createdAt','updatedAt','authorId']);

export const LikeScalarFieldEnumSchema = z.enum(['id','createdAt','userId','postId']);

export const CommentScalarFieldEnumSchema = z.enum(['id','content','createdAt','updatedAt','userId','postId']);

export const TagScalarFieldEnumSchema = z.enum(['id','name','color','createdAt']);

export const PostTagScalarFieldEnumSchema = z.enum(['id','postId','tagId']);

export const ShopScalarFieldEnumSchema = z.enum(['id','name','address','nearestStation','stationWalkTime','openingHours','holidays','budgetMin','budgetMax','seatingCount','seatingTypes','reservation','privateBooking','wifi','powerOutlet','smokingPolicy','parkingInfo','timeLimit','hookahBrand','flavorCount','photos','websiteUrl','googleMapUrl','snsLinks','latitude','longitude','createdAt','updatedAt']);

export const FlavorScalarFieldEnumSchema = z.enum(['id','name']);

export const AtmosphereScalarFieldEnumSchema = z.enum(['id','name']);

export const HobbyScalarFieldEnumSchema = z.enum(['id','name']);

export const PaymentMethodScalarFieldEnumSchema = z.enum(['id','name']);

export const EventScalarFieldEnumSchema = z.enum(['id','name','description','schedule']);

export const ShopFlavorScalarFieldEnumSchema = z.enum(['shopId','flavorId']);

export const ShopAtmosphereScalarFieldEnumSchema = z.enum(['shopId','atmosphereId']);

export const ShopHobbyScalarFieldEnumSchema = z.enum(['shopId','hobbyId']);

export const ShopPaymentMethodScalarFieldEnumSchema = z.enum(['shopId','paymentMethodId']);

export const ShopEventScalarFieldEnumSchema = z.enum(['shopId','eventId']);

export const ReviewScalarFieldEnumSchema = z.enum(['id','shopId','userId','ratingTaste','ratingAtmosphere','ratingService','ratingValue','comment','tags','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string(),
  name: z.string().nullish(),
  bio: z.string().nullish(),
  avatar: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  posts: PostWithRelations[];
  likes: LikeWithRelations[];
  comments: CommentWithRelations[];
  reviews: ReviewWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  posts: z.lazy(() => PostWithRelationsSchema).array(),
  likes: z.lazy(() => LikeWithRelationsSchema).array(),
  comments: z.lazy(() => CommentWithRelationsSchema).array(),
  reviews: z.lazy(() => ReviewWithRelationsSchema).array(),
}))

// USER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserOptionalDefaultsRelations = {
  posts: PostOptionalDefaultsWithRelations[];
  likes: LikeOptionalDefaultsWithRelations[];
  comments: CommentOptionalDefaultsWithRelations[];
  reviews: ReviewOptionalDefaultsWithRelations[];
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  posts: z.lazy(() => PostOptionalDefaultsWithRelationsSchema).array(),
  likes: z.lazy(() => LikeOptionalDefaultsWithRelationsSchema).array(),
  comments: z.lazy(() => CommentOptionalDefaultsWithRelationsSchema).array(),
  reviews: z.lazy(() => ReviewOptionalDefaultsWithRelationsSchema).array(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  posts?: PostPartialWithRelations[];
  likes?: LikePartialWithRelations[];
  comments?: CommentPartialWithRelations[];
  reviews?: ReviewPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  posts: z.lazy(() => PostPartialWithRelationsSchema).array(),
  likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  reviews: z.lazy(() => ReviewPartialWithRelationsSchema).array(),
})).partial()

export type UserOptionalDefaultsWithPartialRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserPartialRelations

export const UserOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserOptionalDefaultsWithPartialRelations> = UserOptionalDefaultsSchema.merge(z.object({
  posts: z.lazy(() => PostPartialWithRelationsSchema).array(),
  likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  reviews: z.lazy(() => ReviewPartialWithRelationsSchema).array(),
}).partial())

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  posts: z.lazy(() => PostPartialWithRelationsSchema).array(),
  likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  reviews: z.lazy(() => ReviewPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  content: z.string().nullish(),
  imageUrl: z.string().nullish(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  address: z.string().nullish(),
  isPublic: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  authorId: z.string(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// POST PARTIAL SCHEMA
/////////////////////////////////////////

export const PostPartialSchema = PostSchema.partial()

export type PostPartial = z.infer<typeof PostPartialSchema>

// POST OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PostOptionalDefaultsSchema = PostSchema.merge(z.object({
  id: z.string().cuid().optional(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PostOptionalDefaults = z.infer<typeof PostOptionalDefaultsSchema>

// POST RELATION SCHEMA
//------------------------------------------------------

export type PostRelations = {
  author: UserWithRelations;
  likes: LikeWithRelations[];
  comments: CommentWithRelations[];
  tags: PostTagWithRelations[];
};

export type PostWithRelations = z.infer<typeof PostSchema> & PostRelations

export const PostWithRelationsSchema: z.ZodType<PostWithRelations> = PostSchema.merge(z.object({
  author: z.lazy(() => UserWithRelationsSchema),
  likes: z.lazy(() => LikeWithRelationsSchema).array(),
  comments: z.lazy(() => CommentWithRelationsSchema).array(),
  tags: z.lazy(() => PostTagWithRelationsSchema).array(),
}))

// POST OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PostOptionalDefaultsRelations = {
  author: UserOptionalDefaultsWithRelations;
  likes: LikeOptionalDefaultsWithRelations[];
  comments: CommentOptionalDefaultsWithRelations[];
  tags: PostTagOptionalDefaultsWithRelations[];
};

export type PostOptionalDefaultsWithRelations = z.infer<typeof PostOptionalDefaultsSchema> & PostOptionalDefaultsRelations

export const PostOptionalDefaultsWithRelationsSchema: z.ZodType<PostOptionalDefaultsWithRelations> = PostOptionalDefaultsSchema.merge(z.object({
  author: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  likes: z.lazy(() => LikeOptionalDefaultsWithRelationsSchema).array(),
  comments: z.lazy(() => CommentOptionalDefaultsWithRelationsSchema).array(),
  tags: z.lazy(() => PostTagOptionalDefaultsWithRelationsSchema).array(),
}))

// POST PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PostPartialRelations = {
  author?: UserPartialWithRelations;
  likes?: LikePartialWithRelations[];
  comments?: CommentPartialWithRelations[];
  tags?: PostTagPartialWithRelations[];
};

export type PostPartialWithRelations = z.infer<typeof PostPartialSchema> & PostPartialRelations

export const PostPartialWithRelationsSchema: z.ZodType<PostPartialWithRelations> = PostPartialSchema.merge(z.object({
  author: z.lazy(() => UserPartialWithRelationsSchema),
  likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  tags: z.lazy(() => PostTagPartialWithRelationsSchema).array(),
})).partial()

export type PostOptionalDefaultsWithPartialRelations = z.infer<typeof PostOptionalDefaultsSchema> & PostPartialRelations

export const PostOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PostOptionalDefaultsWithPartialRelations> = PostOptionalDefaultsSchema.merge(z.object({
  author: z.lazy(() => UserPartialWithRelationsSchema),
  likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  tags: z.lazy(() => PostTagPartialWithRelationsSchema).array(),
}).partial())

export type PostWithPartialRelations = z.infer<typeof PostSchema> & PostPartialRelations

export const PostWithPartialRelationsSchema: z.ZodType<PostWithPartialRelations> = PostSchema.merge(z.object({
  author: z.lazy(() => UserPartialWithRelationsSchema),
  likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  tags: z.lazy(() => PostTagPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// LIKE SCHEMA
/////////////////////////////////////////

export const LikeSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  postId: z.string(),
})

export type Like = z.infer<typeof LikeSchema>

/////////////////////////////////////////
// LIKE PARTIAL SCHEMA
/////////////////////////////////////////

export const LikePartialSchema = LikeSchema.partial()

export type LikePartial = z.infer<typeof LikePartialSchema>

// LIKE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const LikeOptionalDefaultsSchema = LikeSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type LikeOptionalDefaults = z.infer<typeof LikeOptionalDefaultsSchema>

// LIKE RELATION SCHEMA
//------------------------------------------------------

export type LikeRelations = {
  user: UserWithRelations;
  post: PostWithRelations;
};

export type LikeWithRelations = z.infer<typeof LikeSchema> & LikeRelations

export const LikeWithRelationsSchema: z.ZodType<LikeWithRelations> = LikeSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  post: z.lazy(() => PostWithRelationsSchema),
}))

// LIKE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type LikeOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  post: PostOptionalDefaultsWithRelations;
};

export type LikeOptionalDefaultsWithRelations = z.infer<typeof LikeOptionalDefaultsSchema> & LikeOptionalDefaultsRelations

export const LikeOptionalDefaultsWithRelationsSchema: z.ZodType<LikeOptionalDefaultsWithRelations> = LikeOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  post: z.lazy(() => PostOptionalDefaultsWithRelationsSchema),
}))

// LIKE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type LikePartialRelations = {
  user?: UserPartialWithRelations;
  post?: PostPartialWithRelations;
};

export type LikePartialWithRelations = z.infer<typeof LikePartialSchema> & LikePartialRelations

export const LikePartialWithRelationsSchema: z.ZodType<LikePartialWithRelations> = LikePartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  post: z.lazy(() => PostPartialWithRelationsSchema),
})).partial()

export type LikeOptionalDefaultsWithPartialRelations = z.infer<typeof LikeOptionalDefaultsSchema> & LikePartialRelations

export const LikeOptionalDefaultsWithPartialRelationsSchema: z.ZodType<LikeOptionalDefaultsWithPartialRelations> = LikeOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  post: z.lazy(() => PostPartialWithRelationsSchema),
}).partial())

export type LikeWithPartialRelations = z.infer<typeof LikeSchema> & LikePartialRelations

export const LikeWithPartialRelationsSchema: z.ZodType<LikeWithPartialRelations> = LikeSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  post: z.lazy(() => PostPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().cuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  postId: z.string(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// COMMENT PARTIAL SCHEMA
/////////////////////////////////////////

export const CommentPartialSchema = CommentSchema.partial()

export type CommentPartial = z.infer<typeof CommentPartialSchema>

// COMMENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CommentOptionalDefaultsSchema = CommentSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type CommentOptionalDefaults = z.infer<typeof CommentOptionalDefaultsSchema>

// COMMENT RELATION SCHEMA
//------------------------------------------------------

export type CommentRelations = {
  user: UserWithRelations;
  post: PostWithRelations;
};

export type CommentWithRelations = z.infer<typeof CommentSchema> & CommentRelations

export const CommentWithRelationsSchema: z.ZodType<CommentWithRelations> = CommentSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  post: z.lazy(() => PostWithRelationsSchema),
}))

// COMMENT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type CommentOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  post: PostOptionalDefaultsWithRelations;
};

export type CommentOptionalDefaultsWithRelations = z.infer<typeof CommentOptionalDefaultsSchema> & CommentOptionalDefaultsRelations

export const CommentOptionalDefaultsWithRelationsSchema: z.ZodType<CommentOptionalDefaultsWithRelations> = CommentOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  post: z.lazy(() => PostOptionalDefaultsWithRelationsSchema),
}))

// COMMENT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CommentPartialRelations = {
  user?: UserPartialWithRelations;
  post?: PostPartialWithRelations;
};

export type CommentPartialWithRelations = z.infer<typeof CommentPartialSchema> & CommentPartialRelations

export const CommentPartialWithRelationsSchema: z.ZodType<CommentPartialWithRelations> = CommentPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  post: z.lazy(() => PostPartialWithRelationsSchema),
})).partial()

export type CommentOptionalDefaultsWithPartialRelations = z.infer<typeof CommentOptionalDefaultsSchema> & CommentPartialRelations

export const CommentOptionalDefaultsWithPartialRelationsSchema: z.ZodType<CommentOptionalDefaultsWithPartialRelations> = CommentOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  post: z.lazy(() => PostPartialWithRelationsSchema),
}).partial())

export type CommentWithPartialRelations = z.infer<typeof CommentSchema> & CommentPartialRelations

export const CommentWithPartialRelationsSchema: z.ZodType<CommentWithPartialRelations> = CommentSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  post: z.lazy(() => PostPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  color: z.string().nullish(),
  createdAt: z.coerce.date(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// TAG PARTIAL SCHEMA
/////////////////////////////////////////

export const TagPartialSchema = TagSchema.partial()

export type TagPartial = z.infer<typeof TagPartialSchema>

// TAG OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TagOptionalDefaultsSchema = TagSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type TagOptionalDefaults = z.infer<typeof TagOptionalDefaultsSchema>

// TAG RELATION SCHEMA
//------------------------------------------------------

export type TagRelations = {
  posts: PostTagWithRelations[];
};

export type TagWithRelations = z.infer<typeof TagSchema> & TagRelations

export const TagWithRelationsSchema: z.ZodType<TagWithRelations> = TagSchema.merge(z.object({
  posts: z.lazy(() => PostTagWithRelationsSchema).array(),
}))

// TAG OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TagOptionalDefaultsRelations = {
  posts: PostTagOptionalDefaultsWithRelations[];
};

export type TagOptionalDefaultsWithRelations = z.infer<typeof TagOptionalDefaultsSchema> & TagOptionalDefaultsRelations

export const TagOptionalDefaultsWithRelationsSchema: z.ZodType<TagOptionalDefaultsWithRelations> = TagOptionalDefaultsSchema.merge(z.object({
  posts: z.lazy(() => PostTagOptionalDefaultsWithRelationsSchema).array(),
}))

// TAG PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TagPartialRelations = {
  posts?: PostTagPartialWithRelations[];
};

export type TagPartialWithRelations = z.infer<typeof TagPartialSchema> & TagPartialRelations

export const TagPartialWithRelationsSchema: z.ZodType<TagPartialWithRelations> = TagPartialSchema.merge(z.object({
  posts: z.lazy(() => PostTagPartialWithRelationsSchema).array(),
})).partial()

export type TagOptionalDefaultsWithPartialRelations = z.infer<typeof TagOptionalDefaultsSchema> & TagPartialRelations

export const TagOptionalDefaultsWithPartialRelationsSchema: z.ZodType<TagOptionalDefaultsWithPartialRelations> = TagOptionalDefaultsSchema.merge(z.object({
  posts: z.lazy(() => PostTagPartialWithRelationsSchema).array(),
}).partial())

export type TagWithPartialRelations = z.infer<typeof TagSchema> & TagPartialRelations

export const TagWithPartialRelationsSchema: z.ZodType<TagWithPartialRelations> = TagSchema.merge(z.object({
  posts: z.lazy(() => PostTagPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// POST TAG SCHEMA
/////////////////////////////////////////

export const PostTagSchema = z.object({
  id: z.string().cuid(),
  postId: z.string(),
  tagId: z.string(),
})

export type PostTag = z.infer<typeof PostTagSchema>

/////////////////////////////////////////
// POST TAG PARTIAL SCHEMA
/////////////////////////////////////////

export const PostTagPartialSchema = PostTagSchema.partial()

export type PostTagPartial = z.infer<typeof PostTagPartialSchema>

// POST TAG OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PostTagOptionalDefaultsSchema = PostTagSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type PostTagOptionalDefaults = z.infer<typeof PostTagOptionalDefaultsSchema>

// POST TAG RELATION SCHEMA
//------------------------------------------------------

export type PostTagRelations = {
  post: PostWithRelations;
  tag: TagWithRelations;
};

export type PostTagWithRelations = z.infer<typeof PostTagSchema> & PostTagRelations

export const PostTagWithRelationsSchema: z.ZodType<PostTagWithRelations> = PostTagSchema.merge(z.object({
  post: z.lazy(() => PostWithRelationsSchema),
  tag: z.lazy(() => TagWithRelationsSchema),
}))

// POST TAG OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PostTagOptionalDefaultsRelations = {
  post: PostOptionalDefaultsWithRelations;
  tag: TagOptionalDefaultsWithRelations;
};

export type PostTagOptionalDefaultsWithRelations = z.infer<typeof PostTagOptionalDefaultsSchema> & PostTagOptionalDefaultsRelations

export const PostTagOptionalDefaultsWithRelationsSchema: z.ZodType<PostTagOptionalDefaultsWithRelations> = PostTagOptionalDefaultsSchema.merge(z.object({
  post: z.lazy(() => PostOptionalDefaultsWithRelationsSchema),
  tag: z.lazy(() => TagOptionalDefaultsWithRelationsSchema),
}))

// POST TAG PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PostTagPartialRelations = {
  post?: PostPartialWithRelations;
  tag?: TagPartialWithRelations;
};

export type PostTagPartialWithRelations = z.infer<typeof PostTagPartialSchema> & PostTagPartialRelations

export const PostTagPartialWithRelationsSchema: z.ZodType<PostTagPartialWithRelations> = PostTagPartialSchema.merge(z.object({
  post: z.lazy(() => PostPartialWithRelationsSchema),
  tag: z.lazy(() => TagPartialWithRelationsSchema),
})).partial()

export type PostTagOptionalDefaultsWithPartialRelations = z.infer<typeof PostTagOptionalDefaultsSchema> & PostTagPartialRelations

export const PostTagOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PostTagOptionalDefaultsWithPartialRelations> = PostTagOptionalDefaultsSchema.merge(z.object({
  post: z.lazy(() => PostPartialWithRelationsSchema),
  tag: z.lazy(() => TagPartialWithRelationsSchema),
}).partial())

export type PostTagWithPartialRelations = z.infer<typeof PostTagSchema> & PostTagPartialRelations

export const PostTagWithPartialRelationsSchema: z.ZodType<PostTagWithPartialRelations> = PostTagSchema.merge(z.object({
  post: z.lazy(() => PostPartialWithRelationsSchema),
  tag: z.lazy(() => TagPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// SHOP SCHEMA
/////////////////////////////////////////

export const ShopSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().nullish(),
  stationWalkTime: z.number().int().nullish(),
  openingHours: z.string().nullish(),
  holidays: z.string().nullish(),
  budgetMin: z.number().int().nullish(),
  budgetMax: z.number().int().nullish(),
  seatingCount: z.number().int().nullish(),
  seatingTypes: z.string().nullish(),
  reservation: z.string().nullish(),
  privateBooking: z.boolean(),
  wifi: z.boolean(),
  powerOutlet: z.boolean(),
  smokingPolicy: z.string().nullish(),
  parkingInfo: z.string().nullish(),
  timeLimit: z.string().nullish(),
  hookahBrand: z.string().nullish(),
  flavorCount: z.number().int().nullish(),
  photos: z.string().nullish(),
  websiteUrl: z.string().nullish(),
  googleMapUrl: z.string().nullish(),
  snsLinks: z.string().nullish(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Shop = z.infer<typeof ShopSchema>

/////////////////////////////////////////
// SHOP PARTIAL SCHEMA
/////////////////////////////////////////

export const ShopPartialSchema = ShopSchema.partial()

export type ShopPartial = z.infer<typeof ShopPartialSchema>

// SHOP OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ShopOptionalDefaultsSchema = ShopSchema.merge(z.object({
  id: z.string().cuid().optional(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ShopOptionalDefaults = z.infer<typeof ShopOptionalDefaultsSchema>

// SHOP RELATION SCHEMA
//------------------------------------------------------

export type ShopRelations = {
  shopFlavors: ShopFlavorWithRelations[];
  shopAtmospheres: ShopAtmosphereWithRelations[];
  shopHobbies: ShopHobbyWithRelations[];
  shopPaymentMethods: ShopPaymentMethodWithRelations[];
  shopEvents: ShopEventWithRelations[];
  reviews: ReviewWithRelations[];
};

export type ShopWithRelations = z.infer<typeof ShopSchema> & ShopRelations

export const ShopWithRelationsSchema: z.ZodType<ShopWithRelations> = ShopSchema.merge(z.object({
  shopFlavors: z.lazy(() => ShopFlavorWithRelationsSchema).array(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereWithRelationsSchema).array(),
  shopHobbies: z.lazy(() => ShopHobbyWithRelationsSchema).array(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodWithRelationsSchema).array(),
  shopEvents: z.lazy(() => ShopEventWithRelationsSchema).array(),
  reviews: z.lazy(() => ReviewWithRelationsSchema).array(),
}))

// SHOP OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ShopOptionalDefaultsRelations = {
  shopFlavors: ShopFlavorOptionalDefaultsWithRelations[];
  shopAtmospheres: ShopAtmosphereOptionalDefaultsWithRelations[];
  shopHobbies: ShopHobbyOptionalDefaultsWithRelations[];
  shopPaymentMethods: ShopPaymentMethodOptionalDefaultsWithRelations[];
  shopEvents: ShopEventOptionalDefaultsWithRelations[];
  reviews: ReviewOptionalDefaultsWithRelations[];
};

export type ShopOptionalDefaultsWithRelations = z.infer<typeof ShopOptionalDefaultsSchema> & ShopOptionalDefaultsRelations

export const ShopOptionalDefaultsWithRelationsSchema: z.ZodType<ShopOptionalDefaultsWithRelations> = ShopOptionalDefaultsSchema.merge(z.object({
  shopFlavors: z.lazy(() => ShopFlavorOptionalDefaultsWithRelationsSchema).array(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereOptionalDefaultsWithRelationsSchema).array(),
  shopHobbies: z.lazy(() => ShopHobbyOptionalDefaultsWithRelationsSchema).array(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodOptionalDefaultsWithRelationsSchema).array(),
  shopEvents: z.lazy(() => ShopEventOptionalDefaultsWithRelationsSchema).array(),
  reviews: z.lazy(() => ReviewOptionalDefaultsWithRelationsSchema).array(),
}))

// SHOP PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ShopPartialRelations = {
  shopFlavors?: ShopFlavorPartialWithRelations[];
  shopAtmospheres?: ShopAtmospherePartialWithRelations[];
  shopHobbies?: ShopHobbyPartialWithRelations[];
  shopPaymentMethods?: ShopPaymentMethodPartialWithRelations[];
  shopEvents?: ShopEventPartialWithRelations[];
  reviews?: ReviewPartialWithRelations[];
};

export type ShopPartialWithRelations = z.infer<typeof ShopPartialSchema> & ShopPartialRelations

export const ShopPartialWithRelationsSchema: z.ZodType<ShopPartialWithRelations> = ShopPartialSchema.merge(z.object({
  shopFlavors: z.lazy(() => ShopFlavorPartialWithRelationsSchema).array(),
  shopAtmospheres: z.lazy(() => ShopAtmospherePartialWithRelationsSchema).array(),
  shopHobbies: z.lazy(() => ShopHobbyPartialWithRelationsSchema).array(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodPartialWithRelationsSchema).array(),
  shopEvents: z.lazy(() => ShopEventPartialWithRelationsSchema).array(),
  reviews: z.lazy(() => ReviewPartialWithRelationsSchema).array(),
})).partial()

export type ShopOptionalDefaultsWithPartialRelations = z.infer<typeof ShopOptionalDefaultsSchema> & ShopPartialRelations

export const ShopOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ShopOptionalDefaultsWithPartialRelations> = ShopOptionalDefaultsSchema.merge(z.object({
  shopFlavors: z.lazy(() => ShopFlavorPartialWithRelationsSchema).array(),
  shopAtmospheres: z.lazy(() => ShopAtmospherePartialWithRelationsSchema).array(),
  shopHobbies: z.lazy(() => ShopHobbyPartialWithRelationsSchema).array(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodPartialWithRelationsSchema).array(),
  shopEvents: z.lazy(() => ShopEventPartialWithRelationsSchema).array(),
  reviews: z.lazy(() => ReviewPartialWithRelationsSchema).array(),
}).partial())

export type ShopWithPartialRelations = z.infer<typeof ShopSchema> & ShopPartialRelations

export const ShopWithPartialRelationsSchema: z.ZodType<ShopWithPartialRelations> = ShopSchema.merge(z.object({
  shopFlavors: z.lazy(() => ShopFlavorPartialWithRelationsSchema).array(),
  shopAtmospheres: z.lazy(() => ShopAtmospherePartialWithRelationsSchema).array(),
  shopHobbies: z.lazy(() => ShopHobbyPartialWithRelationsSchema).array(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodPartialWithRelationsSchema).array(),
  shopEvents: z.lazy(() => ShopEventPartialWithRelationsSchema).array(),
  reviews: z.lazy(() => ReviewPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// FLAVOR SCHEMA
/////////////////////////////////////////

export const FlavorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
})

export type Flavor = z.infer<typeof FlavorSchema>

/////////////////////////////////////////
// FLAVOR PARTIAL SCHEMA
/////////////////////////////////////////

export const FlavorPartialSchema = FlavorSchema.partial()

export type FlavorPartial = z.infer<typeof FlavorPartialSchema>

// FLAVOR OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const FlavorOptionalDefaultsSchema = FlavorSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type FlavorOptionalDefaults = z.infer<typeof FlavorOptionalDefaultsSchema>

// FLAVOR RELATION SCHEMA
//------------------------------------------------------

export type FlavorRelations = {
  shopFlavors: ShopFlavorWithRelations[];
};

export type FlavorWithRelations = z.infer<typeof FlavorSchema> & FlavorRelations

export const FlavorWithRelationsSchema: z.ZodType<FlavorWithRelations> = FlavorSchema.merge(z.object({
  shopFlavors: z.lazy(() => ShopFlavorWithRelationsSchema).array(),
}))

// FLAVOR OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type FlavorOptionalDefaultsRelations = {
  shopFlavors: ShopFlavorOptionalDefaultsWithRelations[];
};

export type FlavorOptionalDefaultsWithRelations = z.infer<typeof FlavorOptionalDefaultsSchema> & FlavorOptionalDefaultsRelations

export const FlavorOptionalDefaultsWithRelationsSchema: z.ZodType<FlavorOptionalDefaultsWithRelations> = FlavorOptionalDefaultsSchema.merge(z.object({
  shopFlavors: z.lazy(() => ShopFlavorOptionalDefaultsWithRelationsSchema).array(),
}))

// FLAVOR PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type FlavorPartialRelations = {
  shopFlavors?: ShopFlavorPartialWithRelations[];
};

export type FlavorPartialWithRelations = z.infer<typeof FlavorPartialSchema> & FlavorPartialRelations

export const FlavorPartialWithRelationsSchema: z.ZodType<FlavorPartialWithRelations> = FlavorPartialSchema.merge(z.object({
  shopFlavors: z.lazy(() => ShopFlavorPartialWithRelationsSchema).array(),
})).partial()

export type FlavorOptionalDefaultsWithPartialRelations = z.infer<typeof FlavorOptionalDefaultsSchema> & FlavorPartialRelations

export const FlavorOptionalDefaultsWithPartialRelationsSchema: z.ZodType<FlavorOptionalDefaultsWithPartialRelations> = FlavorOptionalDefaultsSchema.merge(z.object({
  shopFlavors: z.lazy(() => ShopFlavorPartialWithRelationsSchema).array(),
}).partial())

export type FlavorWithPartialRelations = z.infer<typeof FlavorSchema> & FlavorPartialRelations

export const FlavorWithPartialRelationsSchema: z.ZodType<FlavorWithPartialRelations> = FlavorSchema.merge(z.object({
  shopFlavors: z.lazy(() => ShopFlavorPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// ATMOSPHERE SCHEMA
/////////////////////////////////////////

export const AtmosphereSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
})

export type Atmosphere = z.infer<typeof AtmosphereSchema>

/////////////////////////////////////////
// ATMOSPHERE PARTIAL SCHEMA
/////////////////////////////////////////

export const AtmospherePartialSchema = AtmosphereSchema.partial()

export type AtmospherePartial = z.infer<typeof AtmospherePartialSchema>

// ATMOSPHERE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AtmosphereOptionalDefaultsSchema = AtmosphereSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type AtmosphereOptionalDefaults = z.infer<typeof AtmosphereOptionalDefaultsSchema>

// ATMOSPHERE RELATION SCHEMA
//------------------------------------------------------

export type AtmosphereRelations = {
  shopAtmospheres: ShopAtmosphereWithRelations[];
};

export type AtmosphereWithRelations = z.infer<typeof AtmosphereSchema> & AtmosphereRelations

export const AtmosphereWithRelationsSchema: z.ZodType<AtmosphereWithRelations> = AtmosphereSchema.merge(z.object({
  shopAtmospheres: z.lazy(() => ShopAtmosphereWithRelationsSchema).array(),
}))

// ATMOSPHERE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type AtmosphereOptionalDefaultsRelations = {
  shopAtmospheres: ShopAtmosphereOptionalDefaultsWithRelations[];
};

export type AtmosphereOptionalDefaultsWithRelations = z.infer<typeof AtmosphereOptionalDefaultsSchema> & AtmosphereOptionalDefaultsRelations

export const AtmosphereOptionalDefaultsWithRelationsSchema: z.ZodType<AtmosphereOptionalDefaultsWithRelations> = AtmosphereOptionalDefaultsSchema.merge(z.object({
  shopAtmospheres: z.lazy(() => ShopAtmosphereOptionalDefaultsWithRelationsSchema).array(),
}))

// ATMOSPHERE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AtmospherePartialRelations = {
  shopAtmospheres?: ShopAtmospherePartialWithRelations[];
};

export type AtmospherePartialWithRelations = z.infer<typeof AtmospherePartialSchema> & AtmospherePartialRelations

export const AtmospherePartialWithRelationsSchema: z.ZodType<AtmospherePartialWithRelations> = AtmospherePartialSchema.merge(z.object({
  shopAtmospheres: z.lazy(() => ShopAtmospherePartialWithRelationsSchema).array(),
})).partial()

export type AtmosphereOptionalDefaultsWithPartialRelations = z.infer<typeof AtmosphereOptionalDefaultsSchema> & AtmospherePartialRelations

export const AtmosphereOptionalDefaultsWithPartialRelationsSchema: z.ZodType<AtmosphereOptionalDefaultsWithPartialRelations> = AtmosphereOptionalDefaultsSchema.merge(z.object({
  shopAtmospheres: z.lazy(() => ShopAtmospherePartialWithRelationsSchema).array(),
}).partial())

export type AtmosphereWithPartialRelations = z.infer<typeof AtmosphereSchema> & AtmospherePartialRelations

export const AtmosphereWithPartialRelationsSchema: z.ZodType<AtmosphereWithPartialRelations> = AtmosphereSchema.merge(z.object({
  shopAtmospheres: z.lazy(() => ShopAtmospherePartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// HOBBY SCHEMA
/////////////////////////////////////////

export const HobbySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
})

export type Hobby = z.infer<typeof HobbySchema>

/////////////////////////////////////////
// HOBBY PARTIAL SCHEMA
/////////////////////////////////////////

export const HobbyPartialSchema = HobbySchema.partial()

export type HobbyPartial = z.infer<typeof HobbyPartialSchema>

// HOBBY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const HobbyOptionalDefaultsSchema = HobbySchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type HobbyOptionalDefaults = z.infer<typeof HobbyOptionalDefaultsSchema>

// HOBBY RELATION SCHEMA
//------------------------------------------------------

export type HobbyRelations = {
  shopHobbies: ShopHobbyWithRelations[];
};

export type HobbyWithRelations = z.infer<typeof HobbySchema> & HobbyRelations

export const HobbyWithRelationsSchema: z.ZodType<HobbyWithRelations> = HobbySchema.merge(z.object({
  shopHobbies: z.lazy(() => ShopHobbyWithRelationsSchema).array(),
}))

// HOBBY OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type HobbyOptionalDefaultsRelations = {
  shopHobbies: ShopHobbyOptionalDefaultsWithRelations[];
};

export type HobbyOptionalDefaultsWithRelations = z.infer<typeof HobbyOptionalDefaultsSchema> & HobbyOptionalDefaultsRelations

export const HobbyOptionalDefaultsWithRelationsSchema: z.ZodType<HobbyOptionalDefaultsWithRelations> = HobbyOptionalDefaultsSchema.merge(z.object({
  shopHobbies: z.lazy(() => ShopHobbyOptionalDefaultsWithRelationsSchema).array(),
}))

// HOBBY PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type HobbyPartialRelations = {
  shopHobbies?: ShopHobbyPartialWithRelations[];
};

export type HobbyPartialWithRelations = z.infer<typeof HobbyPartialSchema> & HobbyPartialRelations

export const HobbyPartialWithRelationsSchema: z.ZodType<HobbyPartialWithRelations> = HobbyPartialSchema.merge(z.object({
  shopHobbies: z.lazy(() => ShopHobbyPartialWithRelationsSchema).array(),
})).partial()

export type HobbyOptionalDefaultsWithPartialRelations = z.infer<typeof HobbyOptionalDefaultsSchema> & HobbyPartialRelations

export const HobbyOptionalDefaultsWithPartialRelationsSchema: z.ZodType<HobbyOptionalDefaultsWithPartialRelations> = HobbyOptionalDefaultsSchema.merge(z.object({
  shopHobbies: z.lazy(() => ShopHobbyPartialWithRelationsSchema).array(),
}).partial())

export type HobbyWithPartialRelations = z.infer<typeof HobbySchema> & HobbyPartialRelations

export const HobbyWithPartialRelationsSchema: z.ZodType<HobbyWithPartialRelations> = HobbySchema.merge(z.object({
  shopHobbies: z.lazy(() => ShopHobbyPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// PAYMENT METHOD SCHEMA
/////////////////////////////////////////

export const PaymentMethodSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
})

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>

/////////////////////////////////////////
// PAYMENT METHOD PARTIAL SCHEMA
/////////////////////////////////////////

export const PaymentMethodPartialSchema = PaymentMethodSchema.partial()

export type PaymentMethodPartial = z.infer<typeof PaymentMethodPartialSchema>

// PAYMENT METHOD OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PaymentMethodOptionalDefaultsSchema = PaymentMethodSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type PaymentMethodOptionalDefaults = z.infer<typeof PaymentMethodOptionalDefaultsSchema>

// PAYMENT METHOD RELATION SCHEMA
//------------------------------------------------------

export type PaymentMethodRelations = {
  shopPaymentMethods: ShopPaymentMethodWithRelations[];
};

export type PaymentMethodWithRelations = z.infer<typeof PaymentMethodSchema> & PaymentMethodRelations

export const PaymentMethodWithRelationsSchema: z.ZodType<PaymentMethodWithRelations> = PaymentMethodSchema.merge(z.object({
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodWithRelationsSchema).array(),
}))

// PAYMENT METHOD OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PaymentMethodOptionalDefaultsRelations = {
  shopPaymentMethods: ShopPaymentMethodOptionalDefaultsWithRelations[];
};

export type PaymentMethodOptionalDefaultsWithRelations = z.infer<typeof PaymentMethodOptionalDefaultsSchema> & PaymentMethodOptionalDefaultsRelations

export const PaymentMethodOptionalDefaultsWithRelationsSchema: z.ZodType<PaymentMethodOptionalDefaultsWithRelations> = PaymentMethodOptionalDefaultsSchema.merge(z.object({
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodOptionalDefaultsWithRelationsSchema).array(),
}))

// PAYMENT METHOD PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PaymentMethodPartialRelations = {
  shopPaymentMethods?: ShopPaymentMethodPartialWithRelations[];
};

export type PaymentMethodPartialWithRelations = z.infer<typeof PaymentMethodPartialSchema> & PaymentMethodPartialRelations

export const PaymentMethodPartialWithRelationsSchema: z.ZodType<PaymentMethodPartialWithRelations> = PaymentMethodPartialSchema.merge(z.object({
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodPartialWithRelationsSchema).array(),
})).partial()

export type PaymentMethodOptionalDefaultsWithPartialRelations = z.infer<typeof PaymentMethodOptionalDefaultsSchema> & PaymentMethodPartialRelations

export const PaymentMethodOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PaymentMethodOptionalDefaultsWithPartialRelations> = PaymentMethodOptionalDefaultsSchema.merge(z.object({
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodPartialWithRelationsSchema).array(),
}).partial())

export type PaymentMethodWithPartialRelations = z.infer<typeof PaymentMethodSchema> & PaymentMethodPartialRelations

export const PaymentMethodWithPartialRelationsSchema: z.ZodType<PaymentMethodWithPartialRelations> = PaymentMethodSchema.merge(z.object({
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullish(),
  schedule: z.string().nullish(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// EVENT PARTIAL SCHEMA
/////////////////////////////////////////

export const EventPartialSchema = EventSchema.partial()

export type EventPartial = z.infer<typeof EventPartialSchema>

// EVENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const EventOptionalDefaultsSchema = EventSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type EventOptionalDefaults = z.infer<typeof EventOptionalDefaultsSchema>

// EVENT RELATION SCHEMA
//------------------------------------------------------

export type EventRelations = {
  shopEvents: ShopEventWithRelations[];
};

export type EventWithRelations = z.infer<typeof EventSchema> & EventRelations

export const EventWithRelationsSchema: z.ZodType<EventWithRelations> = EventSchema.merge(z.object({
  shopEvents: z.lazy(() => ShopEventWithRelationsSchema).array(),
}))

// EVENT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type EventOptionalDefaultsRelations = {
  shopEvents: ShopEventOptionalDefaultsWithRelations[];
};

export type EventOptionalDefaultsWithRelations = z.infer<typeof EventOptionalDefaultsSchema> & EventOptionalDefaultsRelations

export const EventOptionalDefaultsWithRelationsSchema: z.ZodType<EventOptionalDefaultsWithRelations> = EventOptionalDefaultsSchema.merge(z.object({
  shopEvents: z.lazy(() => ShopEventOptionalDefaultsWithRelationsSchema).array(),
}))

// EVENT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type EventPartialRelations = {
  shopEvents?: ShopEventPartialWithRelations[];
};

export type EventPartialWithRelations = z.infer<typeof EventPartialSchema> & EventPartialRelations

export const EventPartialWithRelationsSchema: z.ZodType<EventPartialWithRelations> = EventPartialSchema.merge(z.object({
  shopEvents: z.lazy(() => ShopEventPartialWithRelationsSchema).array(),
})).partial()

export type EventOptionalDefaultsWithPartialRelations = z.infer<typeof EventOptionalDefaultsSchema> & EventPartialRelations

export const EventOptionalDefaultsWithPartialRelationsSchema: z.ZodType<EventOptionalDefaultsWithPartialRelations> = EventOptionalDefaultsSchema.merge(z.object({
  shopEvents: z.lazy(() => ShopEventPartialWithRelationsSchema).array(),
}).partial())

export type EventWithPartialRelations = z.infer<typeof EventSchema> & EventPartialRelations

export const EventWithPartialRelationsSchema: z.ZodType<EventWithPartialRelations> = EventSchema.merge(z.object({
  shopEvents: z.lazy(() => ShopEventPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// SHOP FLAVOR SCHEMA
/////////////////////////////////////////

export const ShopFlavorSchema = z.object({
  shopId: z.string(),
  flavorId: z.string(),
})

export type ShopFlavor = z.infer<typeof ShopFlavorSchema>

/////////////////////////////////////////
// SHOP FLAVOR PARTIAL SCHEMA
/////////////////////////////////////////

export const ShopFlavorPartialSchema = ShopFlavorSchema.partial()

export type ShopFlavorPartial = z.infer<typeof ShopFlavorPartialSchema>

// SHOP FLAVOR OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ShopFlavorOptionalDefaultsSchema = ShopFlavorSchema.merge(z.object({
}))

export type ShopFlavorOptionalDefaults = z.infer<typeof ShopFlavorOptionalDefaultsSchema>

// SHOP FLAVOR RELATION SCHEMA
//------------------------------------------------------

export type ShopFlavorRelations = {
  shop: ShopWithRelations;
  flavor: FlavorWithRelations;
};

export type ShopFlavorWithRelations = z.infer<typeof ShopFlavorSchema> & ShopFlavorRelations

export const ShopFlavorWithRelationsSchema: z.ZodType<ShopFlavorWithRelations> = ShopFlavorSchema.merge(z.object({
  shop: z.lazy(() => ShopWithRelationsSchema),
  flavor: z.lazy(() => FlavorWithRelationsSchema),
}))

// SHOP FLAVOR OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ShopFlavorOptionalDefaultsRelations = {
  shop: ShopOptionalDefaultsWithRelations;
  flavor: FlavorOptionalDefaultsWithRelations;
};

export type ShopFlavorOptionalDefaultsWithRelations = z.infer<typeof ShopFlavorOptionalDefaultsSchema> & ShopFlavorOptionalDefaultsRelations

export const ShopFlavorOptionalDefaultsWithRelationsSchema: z.ZodType<ShopFlavorOptionalDefaultsWithRelations> = ShopFlavorOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopOptionalDefaultsWithRelationsSchema),
  flavor: z.lazy(() => FlavorOptionalDefaultsWithRelationsSchema),
}))

// SHOP FLAVOR PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ShopFlavorPartialRelations = {
  shop?: ShopPartialWithRelations;
  flavor?: FlavorPartialWithRelations;
};

export type ShopFlavorPartialWithRelations = z.infer<typeof ShopFlavorPartialSchema> & ShopFlavorPartialRelations

export const ShopFlavorPartialWithRelationsSchema: z.ZodType<ShopFlavorPartialWithRelations> = ShopFlavorPartialSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  flavor: z.lazy(() => FlavorPartialWithRelationsSchema),
})).partial()

export type ShopFlavorOptionalDefaultsWithPartialRelations = z.infer<typeof ShopFlavorOptionalDefaultsSchema> & ShopFlavorPartialRelations

export const ShopFlavorOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ShopFlavorOptionalDefaultsWithPartialRelations> = ShopFlavorOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  flavor: z.lazy(() => FlavorPartialWithRelationsSchema),
}).partial())

export type ShopFlavorWithPartialRelations = z.infer<typeof ShopFlavorSchema> & ShopFlavorPartialRelations

export const ShopFlavorWithPartialRelationsSchema: z.ZodType<ShopFlavorWithPartialRelations> = ShopFlavorSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  flavor: z.lazy(() => FlavorPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// SHOP ATMOSPHERE SCHEMA
/////////////////////////////////////////

export const ShopAtmosphereSchema = z.object({
  shopId: z.string(),
  atmosphereId: z.string(),
})

export type ShopAtmosphere = z.infer<typeof ShopAtmosphereSchema>

/////////////////////////////////////////
// SHOP ATMOSPHERE PARTIAL SCHEMA
/////////////////////////////////////////

export const ShopAtmospherePartialSchema = ShopAtmosphereSchema.partial()

export type ShopAtmospherePartial = z.infer<typeof ShopAtmospherePartialSchema>

// SHOP ATMOSPHERE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ShopAtmosphereOptionalDefaultsSchema = ShopAtmosphereSchema.merge(z.object({
}))

export type ShopAtmosphereOptionalDefaults = z.infer<typeof ShopAtmosphereOptionalDefaultsSchema>

// SHOP ATMOSPHERE RELATION SCHEMA
//------------------------------------------------------

export type ShopAtmosphereRelations = {
  shop: ShopWithRelations;
  atmosphere: AtmosphereWithRelations;
};

export type ShopAtmosphereWithRelations = z.infer<typeof ShopAtmosphereSchema> & ShopAtmosphereRelations

export const ShopAtmosphereWithRelationsSchema: z.ZodType<ShopAtmosphereWithRelations> = ShopAtmosphereSchema.merge(z.object({
  shop: z.lazy(() => ShopWithRelationsSchema),
  atmosphere: z.lazy(() => AtmosphereWithRelationsSchema),
}))

// SHOP ATMOSPHERE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ShopAtmosphereOptionalDefaultsRelations = {
  shop: ShopOptionalDefaultsWithRelations;
  atmosphere: AtmosphereOptionalDefaultsWithRelations;
};

export type ShopAtmosphereOptionalDefaultsWithRelations = z.infer<typeof ShopAtmosphereOptionalDefaultsSchema> & ShopAtmosphereOptionalDefaultsRelations

export const ShopAtmosphereOptionalDefaultsWithRelationsSchema: z.ZodType<ShopAtmosphereOptionalDefaultsWithRelations> = ShopAtmosphereOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopOptionalDefaultsWithRelationsSchema),
  atmosphere: z.lazy(() => AtmosphereOptionalDefaultsWithRelationsSchema),
}))

// SHOP ATMOSPHERE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ShopAtmospherePartialRelations = {
  shop?: ShopPartialWithRelations;
  atmosphere?: AtmospherePartialWithRelations;
};

export type ShopAtmospherePartialWithRelations = z.infer<typeof ShopAtmospherePartialSchema> & ShopAtmospherePartialRelations

export const ShopAtmospherePartialWithRelationsSchema: z.ZodType<ShopAtmospherePartialWithRelations> = ShopAtmospherePartialSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  atmosphere: z.lazy(() => AtmospherePartialWithRelationsSchema),
})).partial()

export type ShopAtmosphereOptionalDefaultsWithPartialRelations = z.infer<typeof ShopAtmosphereOptionalDefaultsSchema> & ShopAtmospherePartialRelations

export const ShopAtmosphereOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ShopAtmosphereOptionalDefaultsWithPartialRelations> = ShopAtmosphereOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  atmosphere: z.lazy(() => AtmospherePartialWithRelationsSchema),
}).partial())

export type ShopAtmosphereWithPartialRelations = z.infer<typeof ShopAtmosphereSchema> & ShopAtmospherePartialRelations

export const ShopAtmosphereWithPartialRelationsSchema: z.ZodType<ShopAtmosphereWithPartialRelations> = ShopAtmosphereSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  atmosphere: z.lazy(() => AtmospherePartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// SHOP HOBBY SCHEMA
/////////////////////////////////////////

export const ShopHobbySchema = z.object({
  shopId: z.string(),
  hobbyId: z.string(),
})

export type ShopHobby = z.infer<typeof ShopHobbySchema>

/////////////////////////////////////////
// SHOP HOBBY PARTIAL SCHEMA
/////////////////////////////////////////

export const ShopHobbyPartialSchema = ShopHobbySchema.partial()

export type ShopHobbyPartial = z.infer<typeof ShopHobbyPartialSchema>

// SHOP HOBBY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ShopHobbyOptionalDefaultsSchema = ShopHobbySchema.merge(z.object({
}))

export type ShopHobbyOptionalDefaults = z.infer<typeof ShopHobbyOptionalDefaultsSchema>

// SHOP HOBBY RELATION SCHEMA
//------------------------------------------------------

export type ShopHobbyRelations = {
  shop: ShopWithRelations;
  hobby: HobbyWithRelations;
};

export type ShopHobbyWithRelations = z.infer<typeof ShopHobbySchema> & ShopHobbyRelations

export const ShopHobbyWithRelationsSchema: z.ZodType<ShopHobbyWithRelations> = ShopHobbySchema.merge(z.object({
  shop: z.lazy(() => ShopWithRelationsSchema),
  hobby: z.lazy(() => HobbyWithRelationsSchema),
}))

// SHOP HOBBY OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ShopHobbyOptionalDefaultsRelations = {
  shop: ShopOptionalDefaultsWithRelations;
  hobby: HobbyOptionalDefaultsWithRelations;
};

export type ShopHobbyOptionalDefaultsWithRelations = z.infer<typeof ShopHobbyOptionalDefaultsSchema> & ShopHobbyOptionalDefaultsRelations

export const ShopHobbyOptionalDefaultsWithRelationsSchema: z.ZodType<ShopHobbyOptionalDefaultsWithRelations> = ShopHobbyOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopOptionalDefaultsWithRelationsSchema),
  hobby: z.lazy(() => HobbyOptionalDefaultsWithRelationsSchema),
}))

// SHOP HOBBY PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ShopHobbyPartialRelations = {
  shop?: ShopPartialWithRelations;
  hobby?: HobbyPartialWithRelations;
};

export type ShopHobbyPartialWithRelations = z.infer<typeof ShopHobbyPartialSchema> & ShopHobbyPartialRelations

export const ShopHobbyPartialWithRelationsSchema: z.ZodType<ShopHobbyPartialWithRelations> = ShopHobbyPartialSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  hobby: z.lazy(() => HobbyPartialWithRelationsSchema),
})).partial()

export type ShopHobbyOptionalDefaultsWithPartialRelations = z.infer<typeof ShopHobbyOptionalDefaultsSchema> & ShopHobbyPartialRelations

export const ShopHobbyOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ShopHobbyOptionalDefaultsWithPartialRelations> = ShopHobbyOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  hobby: z.lazy(() => HobbyPartialWithRelationsSchema),
}).partial())

export type ShopHobbyWithPartialRelations = z.infer<typeof ShopHobbySchema> & ShopHobbyPartialRelations

export const ShopHobbyWithPartialRelationsSchema: z.ZodType<ShopHobbyWithPartialRelations> = ShopHobbySchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  hobby: z.lazy(() => HobbyPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// SHOP PAYMENT METHOD SCHEMA
/////////////////////////////////////////

export const ShopPaymentMethodSchema = z.object({
  shopId: z.string(),
  paymentMethodId: z.string(),
})

export type ShopPaymentMethod = z.infer<typeof ShopPaymentMethodSchema>

/////////////////////////////////////////
// SHOP PAYMENT METHOD PARTIAL SCHEMA
/////////////////////////////////////////

export const ShopPaymentMethodPartialSchema = ShopPaymentMethodSchema.partial()

export type ShopPaymentMethodPartial = z.infer<typeof ShopPaymentMethodPartialSchema>

// SHOP PAYMENT METHOD OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ShopPaymentMethodOptionalDefaultsSchema = ShopPaymentMethodSchema.merge(z.object({
}))

export type ShopPaymentMethodOptionalDefaults = z.infer<typeof ShopPaymentMethodOptionalDefaultsSchema>

// SHOP PAYMENT METHOD RELATION SCHEMA
//------------------------------------------------------

export type ShopPaymentMethodRelations = {
  shop: ShopWithRelations;
  paymentMethod: PaymentMethodWithRelations;
};

export type ShopPaymentMethodWithRelations = z.infer<typeof ShopPaymentMethodSchema> & ShopPaymentMethodRelations

export const ShopPaymentMethodWithRelationsSchema: z.ZodType<ShopPaymentMethodWithRelations> = ShopPaymentMethodSchema.merge(z.object({
  shop: z.lazy(() => ShopWithRelationsSchema),
  paymentMethod: z.lazy(() => PaymentMethodWithRelationsSchema),
}))

// SHOP PAYMENT METHOD OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ShopPaymentMethodOptionalDefaultsRelations = {
  shop: ShopOptionalDefaultsWithRelations;
  paymentMethod: PaymentMethodOptionalDefaultsWithRelations;
};

export type ShopPaymentMethodOptionalDefaultsWithRelations = z.infer<typeof ShopPaymentMethodOptionalDefaultsSchema> & ShopPaymentMethodOptionalDefaultsRelations

export const ShopPaymentMethodOptionalDefaultsWithRelationsSchema: z.ZodType<ShopPaymentMethodOptionalDefaultsWithRelations> = ShopPaymentMethodOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopOptionalDefaultsWithRelationsSchema),
  paymentMethod: z.lazy(() => PaymentMethodOptionalDefaultsWithRelationsSchema),
}))

// SHOP PAYMENT METHOD PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ShopPaymentMethodPartialRelations = {
  shop?: ShopPartialWithRelations;
  paymentMethod?: PaymentMethodPartialWithRelations;
};

export type ShopPaymentMethodPartialWithRelations = z.infer<typeof ShopPaymentMethodPartialSchema> & ShopPaymentMethodPartialRelations

export const ShopPaymentMethodPartialWithRelationsSchema: z.ZodType<ShopPaymentMethodPartialWithRelations> = ShopPaymentMethodPartialSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  paymentMethod: z.lazy(() => PaymentMethodPartialWithRelationsSchema),
})).partial()

export type ShopPaymentMethodOptionalDefaultsWithPartialRelations = z.infer<typeof ShopPaymentMethodOptionalDefaultsSchema> & ShopPaymentMethodPartialRelations

export const ShopPaymentMethodOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ShopPaymentMethodOptionalDefaultsWithPartialRelations> = ShopPaymentMethodOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  paymentMethod: z.lazy(() => PaymentMethodPartialWithRelationsSchema),
}).partial())

export type ShopPaymentMethodWithPartialRelations = z.infer<typeof ShopPaymentMethodSchema> & ShopPaymentMethodPartialRelations

export const ShopPaymentMethodWithPartialRelationsSchema: z.ZodType<ShopPaymentMethodWithPartialRelations> = ShopPaymentMethodSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  paymentMethod: z.lazy(() => PaymentMethodPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// SHOP EVENT SCHEMA
/////////////////////////////////////////

export const ShopEventSchema = z.object({
  shopId: z.string(),
  eventId: z.string(),
})

export type ShopEvent = z.infer<typeof ShopEventSchema>

/////////////////////////////////////////
// SHOP EVENT PARTIAL SCHEMA
/////////////////////////////////////////

export const ShopEventPartialSchema = ShopEventSchema.partial()

export type ShopEventPartial = z.infer<typeof ShopEventPartialSchema>

// SHOP EVENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ShopEventOptionalDefaultsSchema = ShopEventSchema.merge(z.object({
}))

export type ShopEventOptionalDefaults = z.infer<typeof ShopEventOptionalDefaultsSchema>

// SHOP EVENT RELATION SCHEMA
//------------------------------------------------------

export type ShopEventRelations = {
  shop: ShopWithRelations;
  event: EventWithRelations;
};

export type ShopEventWithRelations = z.infer<typeof ShopEventSchema> & ShopEventRelations

export const ShopEventWithRelationsSchema: z.ZodType<ShopEventWithRelations> = ShopEventSchema.merge(z.object({
  shop: z.lazy(() => ShopWithRelationsSchema),
  event: z.lazy(() => EventWithRelationsSchema),
}))

// SHOP EVENT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ShopEventOptionalDefaultsRelations = {
  shop: ShopOptionalDefaultsWithRelations;
  event: EventOptionalDefaultsWithRelations;
};

export type ShopEventOptionalDefaultsWithRelations = z.infer<typeof ShopEventOptionalDefaultsSchema> & ShopEventOptionalDefaultsRelations

export const ShopEventOptionalDefaultsWithRelationsSchema: z.ZodType<ShopEventOptionalDefaultsWithRelations> = ShopEventOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopOptionalDefaultsWithRelationsSchema),
  event: z.lazy(() => EventOptionalDefaultsWithRelationsSchema),
}))

// SHOP EVENT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ShopEventPartialRelations = {
  shop?: ShopPartialWithRelations;
  event?: EventPartialWithRelations;
};

export type ShopEventPartialWithRelations = z.infer<typeof ShopEventPartialSchema> & ShopEventPartialRelations

export const ShopEventPartialWithRelationsSchema: z.ZodType<ShopEventPartialWithRelations> = ShopEventPartialSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  event: z.lazy(() => EventPartialWithRelationsSchema),
})).partial()

export type ShopEventOptionalDefaultsWithPartialRelations = z.infer<typeof ShopEventOptionalDefaultsSchema> & ShopEventPartialRelations

export const ShopEventOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ShopEventOptionalDefaultsWithPartialRelations> = ShopEventOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  event: z.lazy(() => EventPartialWithRelationsSchema),
}).partial())

export type ShopEventWithPartialRelations = z.infer<typeof ShopEventSchema> & ShopEventPartialRelations

export const ShopEventWithPartialRelationsSchema: z.ZodType<ShopEventWithPartialRelations> = ShopEventSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  event: z.lazy(() => EventPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// REVIEW SCHEMA
/////////////////////////////////////////

export const ReviewSchema = z.object({
  id: z.string().cuid(),
  shopId: z.string(),
  userId: z.string().nullish(),
  ratingTaste: z.number().nullish(),
  ratingAtmosphere: z.number().nullish(),
  ratingService: z.number().nullish(),
  ratingValue: z.number().nullish(),
  comment: z.string().nullish(),
  tags: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Review = z.infer<typeof ReviewSchema>

/////////////////////////////////////////
// REVIEW PARTIAL SCHEMA
/////////////////////////////////////////

export const ReviewPartialSchema = ReviewSchema.partial()

export type ReviewPartial = z.infer<typeof ReviewPartialSchema>

// REVIEW OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ReviewOptionalDefaultsSchema = ReviewSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ReviewOptionalDefaults = z.infer<typeof ReviewOptionalDefaultsSchema>

// REVIEW RELATION SCHEMA
//------------------------------------------------------

export type ReviewRelations = {
  shop: ShopWithRelations;
  user?: UserWithRelations | null;
};

export type ReviewWithRelations = z.infer<typeof ReviewSchema> & ReviewRelations

export const ReviewWithRelationsSchema: z.ZodType<ReviewWithRelations> = ReviewSchema.merge(z.object({
  shop: z.lazy(() => ShopWithRelationsSchema),
  user: z.lazy(() => UserWithRelationsSchema).nullish(),
}))

// REVIEW OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ReviewOptionalDefaultsRelations = {
  shop: ShopOptionalDefaultsWithRelations;
  user?: UserOptionalDefaultsWithRelations | null;
};

export type ReviewOptionalDefaultsWithRelations = z.infer<typeof ReviewOptionalDefaultsSchema> & ReviewOptionalDefaultsRelations

export const ReviewOptionalDefaultsWithRelationsSchema: z.ZodType<ReviewOptionalDefaultsWithRelations> = ReviewOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopOptionalDefaultsWithRelationsSchema),
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema).nullish(),
}))

// REVIEW PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ReviewPartialRelations = {
  shop?: ShopPartialWithRelations;
  user?: UserPartialWithRelations | null;
};

export type ReviewPartialWithRelations = z.infer<typeof ReviewPartialSchema> & ReviewPartialRelations

export const ReviewPartialWithRelationsSchema: z.ZodType<ReviewPartialWithRelations> = ReviewPartialSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
})).partial()

export type ReviewOptionalDefaultsWithPartialRelations = z.infer<typeof ReviewOptionalDefaultsSchema> & ReviewPartialRelations

export const ReviewOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ReviewOptionalDefaultsWithPartialRelations> = ReviewOptionalDefaultsSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
}).partial())

export type ReviewWithPartialRelations = z.infer<typeof ReviewSchema> & ReviewPartialRelations

export const ReviewWithPartialRelationsSchema: z.ZodType<ReviewWithPartialRelations> = ReviewSchema.merge(z.object({
  shop: z.lazy(() => ShopPartialWithRelationsSchema),
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
}).partial())

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  posts: z.boolean().optional(),
  likes: z.boolean().optional(),
  comments: z.boolean().optional(),
  reviews: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  bio: z.boolean().optional(),
  avatar: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => PostTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict();

export const PostCountOutputTypeArgsSchema: z.ZodType<Prisma.PostCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PostCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PostCountOutputTypeSelectSchema: z.ZodType<Prisma.PostCountOutputTypeSelect> = z.object({
  likes: z.boolean().optional(),
  comments: z.boolean().optional(),
  tags: z.boolean().optional(),
}).strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  address: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  authorId: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => PostTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LIKE
//------------------------------------------------------

export const LikeIncludeSchema: z.ZodType<Prisma.LikeInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
}).strict()

export const LikeArgsSchema: z.ZodType<Prisma.LikeDefaultArgs> = z.object({
  select: z.lazy(() => LikeSelectSchema).optional(),
  include: z.lazy(() => LikeIncludeSchema).optional(),
}).strict();

export const LikeSelectSchema: z.ZodType<Prisma.LikeSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  postId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
}).strict()

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  postId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  posts: z.union([z.boolean(),z.lazy(() => PostTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  posts: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  color: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POST TAG
//------------------------------------------------------

export const PostTagIncludeSchema: z.ZodType<Prisma.PostTagInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

export const PostTagArgsSchema: z.ZodType<Prisma.PostTagDefaultArgs> = z.object({
  select: z.lazy(() => PostTagSelectSchema).optional(),
  include: z.lazy(() => PostTagIncludeSchema).optional(),
}).strict();

export const PostTagSelectSchema: z.ZodType<Prisma.PostTagSelect> = z.object({
  id: z.boolean().optional(),
  postId: z.boolean().optional(),
  tagId: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

// SHOP
//------------------------------------------------------

export const ShopIncludeSchema: z.ZodType<Prisma.ShopInclude> = z.object({
  shopFlavors: z.union([z.boolean(),z.lazy(() => ShopFlavorFindManyArgsSchema)]).optional(),
  shopAtmospheres: z.union([z.boolean(),z.lazy(() => ShopAtmosphereFindManyArgsSchema)]).optional(),
  shopHobbies: z.union([z.boolean(),z.lazy(() => ShopHobbyFindManyArgsSchema)]).optional(),
  shopPaymentMethods: z.union([z.boolean(),z.lazy(() => ShopPaymentMethodFindManyArgsSchema)]).optional(),
  shopEvents: z.union([z.boolean(),z.lazy(() => ShopEventFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ShopCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ShopArgsSchema: z.ZodType<Prisma.ShopDefaultArgs> = z.object({
  select: z.lazy(() => ShopSelectSchema).optional(),
  include: z.lazy(() => ShopIncludeSchema).optional(),
}).strict();

export const ShopCountOutputTypeArgsSchema: z.ZodType<Prisma.ShopCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ShopCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ShopCountOutputTypeSelectSchema: z.ZodType<Prisma.ShopCountOutputTypeSelect> = z.object({
  shopFlavors: z.boolean().optional(),
  shopAtmospheres: z.boolean().optional(),
  shopHobbies: z.boolean().optional(),
  shopPaymentMethods: z.boolean().optional(),
  shopEvents: z.boolean().optional(),
  reviews: z.boolean().optional(),
}).strict();

export const ShopSelectSchema: z.ZodType<Prisma.ShopSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  nearestStation: z.boolean().optional(),
  stationWalkTime: z.boolean().optional(),
  openingHours: z.boolean().optional(),
  holidays: z.boolean().optional(),
  budgetMin: z.boolean().optional(),
  budgetMax: z.boolean().optional(),
  seatingCount: z.boolean().optional(),
  seatingTypes: z.boolean().optional(),
  reservation: z.boolean().optional(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.boolean().optional(),
  parkingInfo: z.boolean().optional(),
  timeLimit: z.boolean().optional(),
  hookahBrand: z.boolean().optional(),
  flavorCount: z.boolean().optional(),
  photos: z.boolean().optional(),
  websiteUrl: z.boolean().optional(),
  googleMapUrl: z.boolean().optional(),
  snsLinks: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  shopFlavors: z.union([z.boolean(),z.lazy(() => ShopFlavorFindManyArgsSchema)]).optional(),
  shopAtmospheres: z.union([z.boolean(),z.lazy(() => ShopAtmosphereFindManyArgsSchema)]).optional(),
  shopHobbies: z.union([z.boolean(),z.lazy(() => ShopHobbyFindManyArgsSchema)]).optional(),
  shopPaymentMethods: z.union([z.boolean(),z.lazy(() => ShopPaymentMethodFindManyArgsSchema)]).optional(),
  shopEvents: z.union([z.boolean(),z.lazy(() => ShopEventFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ShopCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FLAVOR
//------------------------------------------------------

export const FlavorIncludeSchema: z.ZodType<Prisma.FlavorInclude> = z.object({
  shopFlavors: z.union([z.boolean(),z.lazy(() => ShopFlavorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FlavorCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FlavorArgsSchema: z.ZodType<Prisma.FlavorDefaultArgs> = z.object({
  select: z.lazy(() => FlavorSelectSchema).optional(),
  include: z.lazy(() => FlavorIncludeSchema).optional(),
}).strict();

export const FlavorCountOutputTypeArgsSchema: z.ZodType<Prisma.FlavorCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FlavorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FlavorCountOutputTypeSelectSchema: z.ZodType<Prisma.FlavorCountOutputTypeSelect> = z.object({
  shopFlavors: z.boolean().optional(),
}).strict();

export const FlavorSelectSchema: z.ZodType<Prisma.FlavorSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  shopFlavors: z.union([z.boolean(),z.lazy(() => ShopFlavorFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FlavorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ATMOSPHERE
//------------------------------------------------------

export const AtmosphereIncludeSchema: z.ZodType<Prisma.AtmosphereInclude> = z.object({
  shopAtmospheres: z.union([z.boolean(),z.lazy(() => ShopAtmosphereFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AtmosphereCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AtmosphereArgsSchema: z.ZodType<Prisma.AtmosphereDefaultArgs> = z.object({
  select: z.lazy(() => AtmosphereSelectSchema).optional(),
  include: z.lazy(() => AtmosphereIncludeSchema).optional(),
}).strict();

export const AtmosphereCountOutputTypeArgsSchema: z.ZodType<Prisma.AtmosphereCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AtmosphereCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AtmosphereCountOutputTypeSelectSchema: z.ZodType<Prisma.AtmosphereCountOutputTypeSelect> = z.object({
  shopAtmospheres: z.boolean().optional(),
}).strict();

export const AtmosphereSelectSchema: z.ZodType<Prisma.AtmosphereSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  shopAtmospheres: z.union([z.boolean(),z.lazy(() => ShopAtmosphereFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AtmosphereCountOutputTypeArgsSchema)]).optional(),
}).strict()

// HOBBY
//------------------------------------------------------

export const HobbyIncludeSchema: z.ZodType<Prisma.HobbyInclude> = z.object({
  shopHobbies: z.union([z.boolean(),z.lazy(() => ShopHobbyFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HobbyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const HobbyArgsSchema: z.ZodType<Prisma.HobbyDefaultArgs> = z.object({
  select: z.lazy(() => HobbySelectSchema).optional(),
  include: z.lazy(() => HobbyIncludeSchema).optional(),
}).strict();

export const HobbyCountOutputTypeArgsSchema: z.ZodType<Prisma.HobbyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => HobbyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const HobbyCountOutputTypeSelectSchema: z.ZodType<Prisma.HobbyCountOutputTypeSelect> = z.object({
  shopHobbies: z.boolean().optional(),
}).strict();

export const HobbySelectSchema: z.ZodType<Prisma.HobbySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  shopHobbies: z.union([z.boolean(),z.lazy(() => ShopHobbyFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HobbyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PAYMENT METHOD
//------------------------------------------------------

export const PaymentMethodIncludeSchema: z.ZodType<Prisma.PaymentMethodInclude> = z.object({
  shopPaymentMethods: z.union([z.boolean(),z.lazy(() => ShopPaymentMethodFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PaymentMethodCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PaymentMethodArgsSchema: z.ZodType<Prisma.PaymentMethodDefaultArgs> = z.object({
  select: z.lazy(() => PaymentMethodSelectSchema).optional(),
  include: z.lazy(() => PaymentMethodIncludeSchema).optional(),
}).strict();

export const PaymentMethodCountOutputTypeArgsSchema: z.ZodType<Prisma.PaymentMethodCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PaymentMethodCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PaymentMethodCountOutputTypeSelectSchema: z.ZodType<Prisma.PaymentMethodCountOutputTypeSelect> = z.object({
  shopPaymentMethods: z.boolean().optional(),
}).strict();

export const PaymentMethodSelectSchema: z.ZodType<Prisma.PaymentMethodSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  shopPaymentMethods: z.union([z.boolean(),z.lazy(() => ShopPaymentMethodFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PaymentMethodCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z.object({
  shopEvents: z.union([z.boolean(),z.lazy(() => ShopEventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EventArgsSchema: z.ZodType<Prisma.EventDefaultArgs> = z.object({
  select: z.lazy(() => EventSelectSchema).optional(),
  include: z.lazy(() => EventIncludeSchema).optional(),
}).strict();

export const EventCountOutputTypeArgsSchema: z.ZodType<Prisma.EventCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EventCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventCountOutputTypeSelectSchema: z.ZodType<Prisma.EventCountOutputTypeSelect> = z.object({
  shopEvents: z.boolean().optional(),
}).strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  schedule: z.boolean().optional(),
  shopEvents: z.union([z.boolean(),z.lazy(() => ShopEventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SHOP FLAVOR
//------------------------------------------------------

export const ShopFlavorIncludeSchema: z.ZodType<Prisma.ShopFlavorInclude> = z.object({
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  flavor: z.union([z.boolean(),z.lazy(() => FlavorArgsSchema)]).optional(),
}).strict()

export const ShopFlavorArgsSchema: z.ZodType<Prisma.ShopFlavorDefaultArgs> = z.object({
  select: z.lazy(() => ShopFlavorSelectSchema).optional(),
  include: z.lazy(() => ShopFlavorIncludeSchema).optional(),
}).strict();

export const ShopFlavorSelectSchema: z.ZodType<Prisma.ShopFlavorSelect> = z.object({
  shopId: z.boolean().optional(),
  flavorId: z.boolean().optional(),
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  flavor: z.union([z.boolean(),z.lazy(() => FlavorArgsSchema)]).optional(),
}).strict()

// SHOP ATMOSPHERE
//------------------------------------------------------

export const ShopAtmosphereIncludeSchema: z.ZodType<Prisma.ShopAtmosphereInclude> = z.object({
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  atmosphere: z.union([z.boolean(),z.lazy(() => AtmosphereArgsSchema)]).optional(),
}).strict()

export const ShopAtmosphereArgsSchema: z.ZodType<Prisma.ShopAtmosphereDefaultArgs> = z.object({
  select: z.lazy(() => ShopAtmosphereSelectSchema).optional(),
  include: z.lazy(() => ShopAtmosphereIncludeSchema).optional(),
}).strict();

export const ShopAtmosphereSelectSchema: z.ZodType<Prisma.ShopAtmosphereSelect> = z.object({
  shopId: z.boolean().optional(),
  atmosphereId: z.boolean().optional(),
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  atmosphere: z.union([z.boolean(),z.lazy(() => AtmosphereArgsSchema)]).optional(),
}).strict()

// SHOP HOBBY
//------------------------------------------------------

export const ShopHobbyIncludeSchema: z.ZodType<Prisma.ShopHobbyInclude> = z.object({
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  hobby: z.union([z.boolean(),z.lazy(() => HobbyArgsSchema)]).optional(),
}).strict()

export const ShopHobbyArgsSchema: z.ZodType<Prisma.ShopHobbyDefaultArgs> = z.object({
  select: z.lazy(() => ShopHobbySelectSchema).optional(),
  include: z.lazy(() => ShopHobbyIncludeSchema).optional(),
}).strict();

export const ShopHobbySelectSchema: z.ZodType<Prisma.ShopHobbySelect> = z.object({
  shopId: z.boolean().optional(),
  hobbyId: z.boolean().optional(),
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  hobby: z.union([z.boolean(),z.lazy(() => HobbyArgsSchema)]).optional(),
}).strict()

// SHOP PAYMENT METHOD
//------------------------------------------------------

export const ShopPaymentMethodIncludeSchema: z.ZodType<Prisma.ShopPaymentMethodInclude> = z.object({
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  paymentMethod: z.union([z.boolean(),z.lazy(() => PaymentMethodArgsSchema)]).optional(),
}).strict()

export const ShopPaymentMethodArgsSchema: z.ZodType<Prisma.ShopPaymentMethodDefaultArgs> = z.object({
  select: z.lazy(() => ShopPaymentMethodSelectSchema).optional(),
  include: z.lazy(() => ShopPaymentMethodIncludeSchema).optional(),
}).strict();

export const ShopPaymentMethodSelectSchema: z.ZodType<Prisma.ShopPaymentMethodSelect> = z.object({
  shopId: z.boolean().optional(),
  paymentMethodId: z.boolean().optional(),
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  paymentMethod: z.union([z.boolean(),z.lazy(() => PaymentMethodArgsSchema)]).optional(),
}).strict()

// SHOP EVENT
//------------------------------------------------------

export const ShopEventIncludeSchema: z.ZodType<Prisma.ShopEventInclude> = z.object({
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
}).strict()

export const ShopEventArgsSchema: z.ZodType<Prisma.ShopEventDefaultArgs> = z.object({
  select: z.lazy(() => ShopEventSelectSchema).optional(),
  include: z.lazy(() => ShopEventIncludeSchema).optional(),
}).strict();

export const ShopEventSelectSchema: z.ZodType<Prisma.ShopEventSelect> = z.object({
  shopId: z.boolean().optional(),
  eventId: z.boolean().optional(),
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
}).strict()

// REVIEW
//------------------------------------------------------

export const ReviewIncludeSchema: z.ZodType<Prisma.ReviewInclude> = z.object({
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ReviewArgsSchema: z.ZodType<Prisma.ReviewDefaultArgs> = z.object({
  select: z.lazy(() => ReviewSelectSchema).optional(),
  include: z.lazy(() => ReviewIncludeSchema).optional(),
}).strict();

export const ReviewSelectSchema: z.ZodType<Prisma.ReviewSelect> = z.object({
  id: z.boolean().optional(),
  shopId: z.boolean().optional(),
  userId: z.boolean().optional(),
  ratingTaste: z.boolean().optional(),
  ratingAtmosphere: z.boolean().optional(),
  ratingService: z.boolean().optional(),
  ratingValue: z.boolean().optional(),
  comment: z.boolean().optional(),
  tags: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  shop: z.union([z.boolean(),z.lazy(() => ShopArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  likes: z.lazy(() => LikeOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  reviews: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  tags: z.lazy(() => PostTagListRelationFilterSchema).optional()
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  likes: z.lazy(() => LikeOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => PostTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  tags: z.lazy(() => PostTagListRelationFilterSchema).optional()
}).strict());

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PostAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PostSumOrderByAggregateInputSchema).optional()
}).strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isPublic: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LikeWhereInputSchema: z.ZodType<Prisma.LikeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
}).strict();

export const LikeOrderByWithRelationInputSchema: z.ZodType<Prisma.LikeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional()
}).strict();

export const LikeWhereUniqueInputSchema: z.ZodType<Prisma.LikeWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId_postId: z.lazy(() => LikeUserIdPostIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId_postId: z.lazy(() => LikeUserIdPostIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId_postId: z.lazy(() => LikeUserIdPostIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
}).strict());

export const LikeOrderByWithAggregationInputSchema: z.ZodType<Prisma.LikeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LikeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LikeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LikeMinOrderByAggregateInputSchema).optional()
}).strict();

export const LikeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LikeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LikeScalarWhereWithAggregatesInputSchema),z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeScalarWhereWithAggregatesInputSchema),z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
}).strict());

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostTagListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostTagListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostTagWhereInputSchema: z.ZodType<Prisma.PostTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostTagWhereInputSchema),z.lazy(() => PostTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostTagWhereInputSchema),z.lazy(() => PostTagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict();

export const PostTagOrderByWithRelationInputSchema: z.ZodType<Prisma.PostTagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional()
}).strict();

export const PostTagWhereUniqueInputSchema: z.ZodType<Prisma.PostTagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    postId_tagId: z.lazy(() => PostTagPostIdTagIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    postId_tagId: z.lazy(() => PostTagPostIdTagIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  postId_tagId: z.lazy(() => PostTagPostIdTagIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PostTagWhereInputSchema),z.lazy(() => PostTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostTagWhereInputSchema),z.lazy(() => PostTagWhereInputSchema).array() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict());

export const PostTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const PostTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema),z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema),z.lazy(() => PostTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ShopWhereInputSchema: z.ZodType<Prisma.ShopWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopWhereInputSchema),z.lazy(() => ShopWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopWhereInputSchema),z.lazy(() => ShopWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nearestStation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stationWalkTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  openingHours: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  holidays: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  budgetMin: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  budgetMax: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  seatingCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  seatingTypes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  reservation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  privateBooking: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  wifi: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  powerOutlet: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  smokingPolicy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parkingInfo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  timeLimit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hookahBrand: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flavorCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  photos: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  websiteUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  googleMapUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  snsLinks: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorListRelationFilterSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereListRelationFilterSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyListRelationFilterSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodListRelationFilterSchema).optional(),
  shopEvents: z.lazy(() => ShopEventListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict();

export const ShopOrderByWithRelationInputSchema: z.ZodType<Prisma.ShopOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  nearestStation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stationWalkTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  openingHours: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  holidays: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  budgetMin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  budgetMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  seatingCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  seatingTypes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reservation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  privateBooking: z.lazy(() => SortOrderSchema).optional(),
  wifi: z.lazy(() => SortOrderSchema).optional(),
  powerOutlet: z.lazy(() => SortOrderSchema).optional(),
  smokingPolicy: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parkingInfo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  timeLimit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hookahBrand: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flavorCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  photos: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  websiteUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  googleMapUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  snsLinks: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  shopFlavors: z.lazy(() => ShopFlavorOrderByRelationAggregateInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereOrderByRelationAggregateInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyOrderByRelationAggregateInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodOrderByRelationAggregateInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventOrderByRelationAggregateInputSchema).optional(),
  reviews: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ShopWhereUniqueInputSchema: z.ZodType<Prisma.ShopWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ShopWhereInputSchema),z.lazy(() => ShopWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopWhereInputSchema),z.lazy(() => ShopWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nearestStation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stationWalkTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  openingHours: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  holidays: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  budgetMin: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  budgetMax: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  seatingCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  seatingTypes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  reservation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  privateBooking: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  wifi: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  powerOutlet: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  smokingPolicy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parkingInfo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  timeLimit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hookahBrand: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flavorCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  photos: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  websiteUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  googleMapUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  snsLinks: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorListRelationFilterSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereListRelationFilterSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyListRelationFilterSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodListRelationFilterSchema).optional(),
  shopEvents: z.lazy(() => ShopEventListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict());

export const ShopOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShopOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  nearestStation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stationWalkTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  openingHours: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  holidays: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  budgetMin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  budgetMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  seatingCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  seatingTypes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reservation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  privateBooking: z.lazy(() => SortOrderSchema).optional(),
  wifi: z.lazy(() => SortOrderSchema).optional(),
  powerOutlet: z.lazy(() => SortOrderSchema).optional(),
  smokingPolicy: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parkingInfo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  timeLimit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hookahBrand: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flavorCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  photos: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  websiteUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  googleMapUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  snsLinks: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ShopCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ShopAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShopMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShopMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ShopSumOrderByAggregateInputSchema).optional()
}).strict();

export const ShopScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShopScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShopScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nearestStation: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  stationWalkTime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  openingHours: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  holidays: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  budgetMin: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  budgetMax: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  seatingCount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  seatingTypes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  reservation: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  privateBooking: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  wifi: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  powerOutlet: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  smokingPolicy: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  parkingInfo: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  timeLimit: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  hookahBrand: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  flavorCount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  photos: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  websiteUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  googleMapUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  snsLinks: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FlavorWhereInputSchema: z.ZodType<Prisma.FlavorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FlavorWhereInputSchema),z.lazy(() => FlavorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlavorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlavorWhereInputSchema),z.lazy(() => FlavorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorListRelationFilterSchema).optional()
}).strict();

export const FlavorOrderByWithRelationInputSchema: z.ZodType<Prisma.FlavorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shopFlavors: z.lazy(() => ShopFlavorOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FlavorWhereUniqueInputSchema: z.ZodType<Prisma.FlavorWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => FlavorWhereInputSchema),z.lazy(() => FlavorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlavorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlavorWhereInputSchema),z.lazy(() => FlavorWhereInputSchema).array() ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorListRelationFilterSchema).optional()
}).strict());

export const FlavorOrderByWithAggregationInputSchema: z.ZodType<Prisma.FlavorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FlavorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FlavorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FlavorMinOrderByAggregateInputSchema).optional()
}).strict();

export const FlavorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FlavorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FlavorScalarWhereWithAggregatesInputSchema),z.lazy(() => FlavorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlavorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlavorScalarWhereWithAggregatesInputSchema),z.lazy(() => FlavorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AtmosphereWhereInputSchema: z.ZodType<Prisma.AtmosphereWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AtmosphereWhereInputSchema),z.lazy(() => AtmosphereWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AtmosphereWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AtmosphereWhereInputSchema),z.lazy(() => AtmosphereWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereListRelationFilterSchema).optional()
}).strict();

export const AtmosphereOrderByWithRelationInputSchema: z.ZodType<Prisma.AtmosphereOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AtmosphereWhereUniqueInputSchema: z.ZodType<Prisma.AtmosphereWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => AtmosphereWhereInputSchema),z.lazy(() => AtmosphereWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AtmosphereWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AtmosphereWhereInputSchema),z.lazy(() => AtmosphereWhereInputSchema).array() ]).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereListRelationFilterSchema).optional()
}).strict());

export const AtmosphereOrderByWithAggregationInputSchema: z.ZodType<Prisma.AtmosphereOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AtmosphereCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AtmosphereMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AtmosphereMinOrderByAggregateInputSchema).optional()
}).strict();

export const AtmosphereScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AtmosphereScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AtmosphereScalarWhereWithAggregatesInputSchema),z.lazy(() => AtmosphereScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AtmosphereScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AtmosphereScalarWhereWithAggregatesInputSchema),z.lazy(() => AtmosphereScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const HobbyWhereInputSchema: z.ZodType<Prisma.HobbyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HobbyWhereInputSchema),z.lazy(() => HobbyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HobbyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HobbyWhereInputSchema),z.lazy(() => HobbyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shopHobbies: z.lazy(() => ShopHobbyListRelationFilterSchema).optional()
}).strict();

export const HobbyOrderByWithRelationInputSchema: z.ZodType<Prisma.HobbyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyOrderByRelationAggregateInputSchema).optional()
}).strict();

export const HobbyWhereUniqueInputSchema: z.ZodType<Prisma.HobbyWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => HobbyWhereInputSchema),z.lazy(() => HobbyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HobbyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HobbyWhereInputSchema),z.lazy(() => HobbyWhereInputSchema).array() ]).optional(),
  shopHobbies: z.lazy(() => ShopHobbyListRelationFilterSchema).optional()
}).strict());

export const HobbyOrderByWithAggregationInputSchema: z.ZodType<Prisma.HobbyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HobbyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HobbyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HobbyMinOrderByAggregateInputSchema).optional()
}).strict();

export const HobbyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HobbyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HobbyScalarWhereWithAggregatesInputSchema),z.lazy(() => HobbyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HobbyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HobbyScalarWhereWithAggregatesInputSchema),z.lazy(() => HobbyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PaymentMethodWhereInputSchema: z.ZodType<Prisma.PaymentMethodWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentMethodWhereInputSchema),z.lazy(() => PaymentMethodWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentMethodWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentMethodWhereInputSchema),z.lazy(() => PaymentMethodWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodListRelationFilterSchema).optional()
}).strict();

export const PaymentMethodOrderByWithRelationInputSchema: z.ZodType<Prisma.PaymentMethodOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PaymentMethodWhereUniqueInputSchema: z.ZodType<Prisma.PaymentMethodWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => PaymentMethodWhereInputSchema),z.lazy(() => PaymentMethodWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentMethodWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentMethodWhereInputSchema),z.lazy(() => PaymentMethodWhereInputSchema).array() ]).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodListRelationFilterSchema).optional()
}).strict());

export const PaymentMethodOrderByWithAggregationInputSchema: z.ZodType<Prisma.PaymentMethodOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PaymentMethodCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PaymentMethodMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PaymentMethodMinOrderByAggregateInputSchema).optional()
}).strict();

export const PaymentMethodScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PaymentMethodScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentMethodScalarWhereWithAggregatesInputSchema),z.lazy(() => PaymentMethodScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentMethodScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentMethodScalarWhereWithAggregatesInputSchema),z.lazy(() => PaymentMethodScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  schedule: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  shopEvents: z.lazy(() => ShopEventListRelationFilterSchema).optional()
}).strict();

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  schedule: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  shopEvents: z.lazy(() => ShopEventOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  schedule: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  shopEvents: z.lazy(() => ShopEventListRelationFilterSchema).optional()
}).strict());

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  schedule: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional()
}).strict();

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  schedule: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ShopFlavorWhereInputSchema: z.ZodType<Prisma.ShopFlavorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopFlavorWhereInputSchema),z.lazy(() => ShopFlavorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopFlavorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopFlavorWhereInputSchema),z.lazy(() => ShopFlavorWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  flavor: z.union([ z.lazy(() => FlavorRelationFilterSchema),z.lazy(() => FlavorWhereInputSchema) ]).optional(),
}).strict();

export const ShopFlavorOrderByWithRelationInputSchema: z.ZodType<Prisma.ShopFlavorOrderByWithRelationInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  flavorId: z.lazy(() => SortOrderSchema).optional(),
  shop: z.lazy(() => ShopOrderByWithRelationInputSchema).optional(),
  flavor: z.lazy(() => FlavorOrderByWithRelationInputSchema).optional()
}).strict();

export const ShopFlavorWhereUniqueInputSchema: z.ZodType<Prisma.ShopFlavorWhereUniqueInput> = z.object({
  shopId_flavorId: z.lazy(() => ShopFlavorShopIdFlavorIdCompoundUniqueInputSchema)
})
.and(z.object({
  shopId_flavorId: z.lazy(() => ShopFlavorShopIdFlavorIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ShopFlavorWhereInputSchema),z.lazy(() => ShopFlavorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopFlavorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopFlavorWhereInputSchema),z.lazy(() => ShopFlavorWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  flavor: z.union([ z.lazy(() => FlavorRelationFilterSchema),z.lazy(() => FlavorWhereInputSchema) ]).optional(),
}).strict());

export const ShopFlavorOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShopFlavorOrderByWithAggregationInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  flavorId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ShopFlavorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShopFlavorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShopFlavorMinOrderByAggregateInputSchema).optional()
}).strict();

export const ShopFlavorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShopFlavorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShopFlavorScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopFlavorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopFlavorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopFlavorScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopFlavorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  flavorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ShopAtmosphereWhereInputSchema: z.ZodType<Prisma.ShopAtmosphereWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopAtmosphereWhereInputSchema),z.lazy(() => ShopAtmosphereWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopAtmosphereWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopAtmosphereWhereInputSchema),z.lazy(() => ShopAtmosphereWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  atmosphereId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  atmosphere: z.union([ z.lazy(() => AtmosphereRelationFilterSchema),z.lazy(() => AtmosphereWhereInputSchema) ]).optional(),
}).strict();

export const ShopAtmosphereOrderByWithRelationInputSchema: z.ZodType<Prisma.ShopAtmosphereOrderByWithRelationInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  atmosphereId: z.lazy(() => SortOrderSchema).optional(),
  shop: z.lazy(() => ShopOrderByWithRelationInputSchema).optional(),
  atmosphere: z.lazy(() => AtmosphereOrderByWithRelationInputSchema).optional()
}).strict();

export const ShopAtmosphereWhereUniqueInputSchema: z.ZodType<Prisma.ShopAtmosphereWhereUniqueInput> = z.object({
  shopId_atmosphereId: z.lazy(() => ShopAtmosphereShopIdAtmosphereIdCompoundUniqueInputSchema)
})
.and(z.object({
  shopId_atmosphereId: z.lazy(() => ShopAtmosphereShopIdAtmosphereIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ShopAtmosphereWhereInputSchema),z.lazy(() => ShopAtmosphereWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopAtmosphereWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopAtmosphereWhereInputSchema),z.lazy(() => ShopAtmosphereWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  atmosphereId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  atmosphere: z.union([ z.lazy(() => AtmosphereRelationFilterSchema),z.lazy(() => AtmosphereWhereInputSchema) ]).optional(),
}).strict());

export const ShopAtmosphereOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShopAtmosphereOrderByWithAggregationInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  atmosphereId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ShopAtmosphereCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShopAtmosphereMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShopAtmosphereMinOrderByAggregateInputSchema).optional()
}).strict();

export const ShopAtmosphereScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShopAtmosphereScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShopAtmosphereScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopAtmosphereScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopAtmosphereScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopAtmosphereScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopAtmosphereScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  atmosphereId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ShopHobbyWhereInputSchema: z.ZodType<Prisma.ShopHobbyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopHobbyWhereInputSchema),z.lazy(() => ShopHobbyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopHobbyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopHobbyWhereInputSchema),z.lazy(() => ShopHobbyWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hobbyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  hobby: z.union([ z.lazy(() => HobbyRelationFilterSchema),z.lazy(() => HobbyWhereInputSchema) ]).optional(),
}).strict();

export const ShopHobbyOrderByWithRelationInputSchema: z.ZodType<Prisma.ShopHobbyOrderByWithRelationInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  hobbyId: z.lazy(() => SortOrderSchema).optional(),
  shop: z.lazy(() => ShopOrderByWithRelationInputSchema).optional(),
  hobby: z.lazy(() => HobbyOrderByWithRelationInputSchema).optional()
}).strict();

export const ShopHobbyWhereUniqueInputSchema: z.ZodType<Prisma.ShopHobbyWhereUniqueInput> = z.object({
  shopId_hobbyId: z.lazy(() => ShopHobbyShopIdHobbyIdCompoundUniqueInputSchema)
})
.and(z.object({
  shopId_hobbyId: z.lazy(() => ShopHobbyShopIdHobbyIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ShopHobbyWhereInputSchema),z.lazy(() => ShopHobbyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopHobbyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopHobbyWhereInputSchema),z.lazy(() => ShopHobbyWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hobbyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  hobby: z.union([ z.lazy(() => HobbyRelationFilterSchema),z.lazy(() => HobbyWhereInputSchema) ]).optional(),
}).strict());

export const ShopHobbyOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShopHobbyOrderByWithAggregationInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  hobbyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ShopHobbyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShopHobbyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShopHobbyMinOrderByAggregateInputSchema).optional()
}).strict();

export const ShopHobbyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShopHobbyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShopHobbyScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopHobbyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopHobbyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopHobbyScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopHobbyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hobbyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ShopPaymentMethodWhereInputSchema: z.ZodType<Prisma.ShopPaymentMethodWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopPaymentMethodWhereInputSchema),z.lazy(() => ShopPaymentMethodWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopPaymentMethodWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopPaymentMethodWhereInputSchema),z.lazy(() => ShopPaymentMethodWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  paymentMethodId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodRelationFilterSchema),z.lazy(() => PaymentMethodWhereInputSchema) ]).optional(),
}).strict();

export const ShopPaymentMethodOrderByWithRelationInputSchema: z.ZodType<Prisma.ShopPaymentMethodOrderByWithRelationInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  paymentMethodId: z.lazy(() => SortOrderSchema).optional(),
  shop: z.lazy(() => ShopOrderByWithRelationInputSchema).optional(),
  paymentMethod: z.lazy(() => PaymentMethodOrderByWithRelationInputSchema).optional()
}).strict();

export const ShopPaymentMethodWhereUniqueInputSchema: z.ZodType<Prisma.ShopPaymentMethodWhereUniqueInput> = z.object({
  shopId_paymentMethodId: z.lazy(() => ShopPaymentMethodShopIdPaymentMethodIdCompoundUniqueInputSchema)
})
.and(z.object({
  shopId_paymentMethodId: z.lazy(() => ShopPaymentMethodShopIdPaymentMethodIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ShopPaymentMethodWhereInputSchema),z.lazy(() => ShopPaymentMethodWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopPaymentMethodWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopPaymentMethodWhereInputSchema),z.lazy(() => ShopPaymentMethodWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  paymentMethodId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodRelationFilterSchema),z.lazy(() => PaymentMethodWhereInputSchema) ]).optional(),
}).strict());

export const ShopPaymentMethodOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShopPaymentMethodOrderByWithAggregationInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  paymentMethodId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ShopPaymentMethodCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShopPaymentMethodMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShopPaymentMethodMinOrderByAggregateInputSchema).optional()
}).strict();

export const ShopPaymentMethodScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShopPaymentMethodScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShopPaymentMethodScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopPaymentMethodScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopPaymentMethodScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopPaymentMethodScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopPaymentMethodScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  paymentMethodId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ShopEventWhereInputSchema: z.ZodType<Prisma.ShopEventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopEventWhereInputSchema),z.lazy(() => ShopEventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopEventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopEventWhereInputSchema),z.lazy(() => ShopEventWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
}).strict();

export const ShopEventOrderByWithRelationInputSchema: z.ZodType<Prisma.ShopEventOrderByWithRelationInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  shop: z.lazy(() => ShopOrderByWithRelationInputSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional()
}).strict();

export const ShopEventWhereUniqueInputSchema: z.ZodType<Prisma.ShopEventWhereUniqueInput> = z.object({
  shopId_eventId: z.lazy(() => ShopEventShopIdEventIdCompoundUniqueInputSchema)
})
.and(z.object({
  shopId_eventId: z.lazy(() => ShopEventShopIdEventIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ShopEventWhereInputSchema),z.lazy(() => ShopEventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopEventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopEventWhereInputSchema),z.lazy(() => ShopEventWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
}).strict());

export const ShopEventOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShopEventOrderByWithAggregationInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ShopEventCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShopEventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShopEventMinOrderByAggregateInputSchema).optional()
}).strict();

export const ShopEventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShopEventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShopEventScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopEventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopEventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopEventScalarWhereWithAggregatesInputSchema),z.lazy(() => ShopEventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ReviewWhereInputSchema: z.ZodType<Prisma.ReviewWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ratingTaste: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ratingService: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ratingValue: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tags: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ReviewOrderByWithRelationInputSchema: z.ZodType<Prisma.ReviewOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  shopId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ratingTaste: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ratingAtmosphere: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ratingService: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ratingValue: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  shop: z.lazy(() => ShopOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ReviewWhereUniqueInputSchema: z.ZodType<Prisma.ReviewWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ratingTaste: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ratingService: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ratingValue: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tags: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  shop: z.union([ z.lazy(() => ShopRelationFilterSchema),z.lazy(() => ShopWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ReviewOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReviewOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  shopId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ratingTaste: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ratingAtmosphere: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ratingService: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ratingValue: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReviewCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReviewAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReviewMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReviewMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReviewSumOrderByAggregateInputSchema).optional()
}).strict();

export const ReviewScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReviewScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  shopId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ratingTaste: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  ratingService: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  ratingValue: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  tags: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  likes: z.lazy(() => LikeCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string()
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeCreateInputSchema: z.ZodType<Prisma.LikeCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutLikesInputSchema),
  post: z.lazy(() => PostCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikeUncheckedCreateInputSchema: z.ZodType<Prisma.LikeUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  postId: z.string()
}).strict();

export const LikeUpdateInputSchema: z.ZodType<Prisma.LikeUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLikesNestedInputSchema).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikeUncheckedUpdateInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeCreateManyInputSchema: z.ZodType<Prisma.LikeCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  postId: z.string()
}).strict();

export const LikeUpdateManyMutationInputSchema: z.ZodType<Prisma.LikeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  postId: z.string()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  postId: z.string()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostTagCreateInputSchema: z.ZodType<Prisma.PostTagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutTagsInputSchema),
  tag: z.lazy(() => TagCreateNestedOneWithoutPostsInputSchema)
}).strict();

export const PostTagUncheckedCreateInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  postId: z.string(),
  tagId: z.string()
}).strict();

export const PostTagUpdateInputSchema: z.ZodType<Prisma.PostTagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutTagsNestedInputSchema).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostTagUncheckedUpdateInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostTagCreateManyInputSchema: z.ZodType<Prisma.PostTagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  postId: z.string(),
  tagId: z.string()
}).strict();

export const PostTagUpdateManyMutationInputSchema: z.ZodType<Prisma.PostTagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopCreateInputSchema: z.ZodType<Prisma.ShopCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorCreateNestedManyWithoutShopInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopUncheckedCreateInputSchema: z.ZodType<Prisma.ShopUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopUpdateInputSchema: z.ZodType<Prisma.ShopUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUpdateManyWithoutShopNestedInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const ShopUncheckedUpdateInputSchema: z.ZodType<Prisma.ShopUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const ShopCreateManyInputSchema: z.ZodType<Prisma.ShopCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ShopUpdateManyMutationInputSchema: z.ZodType<Prisma.ShopUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShopUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FlavorCreateInputSchema: z.ZodType<Prisma.FlavorCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  shopFlavors: z.lazy(() => ShopFlavorCreateNestedManyWithoutFlavorInputSchema).optional()
}).strict();

export const FlavorUncheckedCreateInputSchema: z.ZodType<Prisma.FlavorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedCreateNestedManyWithoutFlavorInputSchema).optional()
}).strict();

export const FlavorUpdateInputSchema: z.ZodType<Prisma.FlavorUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUpdateManyWithoutFlavorNestedInputSchema).optional()
}).strict();

export const FlavorUncheckedUpdateInputSchema: z.ZodType<Prisma.FlavorUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedUpdateManyWithoutFlavorNestedInputSchema).optional()
}).strict();

export const FlavorCreateManyInputSchema: z.ZodType<Prisma.FlavorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const FlavorUpdateManyMutationInputSchema: z.ZodType<Prisma.FlavorUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FlavorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FlavorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AtmosphereCreateInputSchema: z.ZodType<Prisma.AtmosphereCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereCreateNestedManyWithoutAtmosphereInputSchema).optional()
}).strict();

export const AtmosphereUncheckedCreateInputSchema: z.ZodType<Prisma.AtmosphereUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedCreateNestedManyWithoutAtmosphereInputSchema).optional()
}).strict();

export const AtmosphereUpdateInputSchema: z.ZodType<Prisma.AtmosphereUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUpdateManyWithoutAtmosphereNestedInputSchema).optional()
}).strict();

export const AtmosphereUncheckedUpdateInputSchema: z.ZodType<Prisma.AtmosphereUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedUpdateManyWithoutAtmosphereNestedInputSchema).optional()
}).strict();

export const AtmosphereCreateManyInputSchema: z.ZodType<Prisma.AtmosphereCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const AtmosphereUpdateManyMutationInputSchema: z.ZodType<Prisma.AtmosphereUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AtmosphereUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AtmosphereUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HobbyCreateInputSchema: z.ZodType<Prisma.HobbyCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  shopHobbies: z.lazy(() => ShopHobbyCreateNestedManyWithoutHobbyInputSchema).optional()
}).strict();

export const HobbyUncheckedCreateInputSchema: z.ZodType<Prisma.HobbyUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedCreateNestedManyWithoutHobbyInputSchema).optional()
}).strict();

export const HobbyUpdateInputSchema: z.ZodType<Prisma.HobbyUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUpdateManyWithoutHobbyNestedInputSchema).optional()
}).strict();

export const HobbyUncheckedUpdateInputSchema: z.ZodType<Prisma.HobbyUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedUpdateManyWithoutHobbyNestedInputSchema).optional()
}).strict();

export const HobbyCreateManyInputSchema: z.ZodType<Prisma.HobbyCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const HobbyUpdateManyMutationInputSchema: z.ZodType<Prisma.HobbyUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HobbyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HobbyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentMethodCreateInputSchema: z.ZodType<Prisma.PaymentMethodCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodCreateNestedManyWithoutPaymentMethodInputSchema).optional()
}).strict();

export const PaymentMethodUncheckedCreateInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedCreateNestedManyWithoutPaymentMethodInputSchema).optional()
}).strict();

export const PaymentMethodUpdateInputSchema: z.ZodType<Prisma.PaymentMethodUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUpdateManyWithoutPaymentMethodNestedInputSchema).optional()
}).strict();

export const PaymentMethodUncheckedUpdateInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedUpdateManyWithoutPaymentMethodNestedInputSchema).optional()
}).strict();

export const PaymentMethodCreateManyInputSchema: z.ZodType<Prisma.PaymentMethodCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const PaymentMethodUpdateManyMutationInputSchema: z.ZodType<Prisma.PaymentMethodUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentMethodUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  schedule: z.string().optional().nullable(),
  shopEvents: z.lazy(() => ShopEventCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  schedule: z.string().optional().nullable(),
  shopEvents: z.lazy(() => ShopEventUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schedule: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shopEvents: z.lazy(() => ShopEventUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schedule: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  shopEvents: z.lazy(() => ShopEventUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  schedule: z.string().optional().nullable()
}).strict();

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schedule: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schedule: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShopFlavorCreateInputSchema: z.ZodType<Prisma.ShopFlavorCreateInput> = z.object({
  shop: z.lazy(() => ShopCreateNestedOneWithoutShopFlavorsInputSchema),
  flavor: z.lazy(() => FlavorCreateNestedOneWithoutShopFlavorsInputSchema)
}).strict();

export const ShopFlavorUncheckedCreateInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedCreateInput> = z.object({
  shopId: z.string(),
  flavorId: z.string()
}).strict();

export const ShopFlavorUpdateInputSchema: z.ZodType<Prisma.ShopFlavorUpdateInput> = z.object({
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutShopFlavorsNestedInputSchema).optional(),
  flavor: z.lazy(() => FlavorUpdateOneRequiredWithoutShopFlavorsNestedInputSchema).optional()
}).strict();

export const ShopFlavorUncheckedUpdateInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedUpdateInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopFlavorCreateManyInputSchema: z.ZodType<Prisma.ShopFlavorCreateManyInput> = z.object({
  shopId: z.string(),
  flavorId: z.string()
}).strict();

export const ShopFlavorUpdateManyMutationInputSchema: z.ZodType<Prisma.ShopFlavorUpdateManyMutationInput> = z.object({
}).strict();

export const ShopFlavorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedUpdateManyInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  flavorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopAtmosphereCreateInputSchema: z.ZodType<Prisma.ShopAtmosphereCreateInput> = z.object({
  shop: z.lazy(() => ShopCreateNestedOneWithoutShopAtmospheresInputSchema),
  atmosphere: z.lazy(() => AtmosphereCreateNestedOneWithoutShopAtmospheresInputSchema)
}).strict();

export const ShopAtmosphereUncheckedCreateInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedCreateInput> = z.object({
  shopId: z.string(),
  atmosphereId: z.string()
}).strict();

export const ShopAtmosphereUpdateInputSchema: z.ZodType<Prisma.ShopAtmosphereUpdateInput> = z.object({
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutShopAtmospheresNestedInputSchema).optional(),
  atmosphere: z.lazy(() => AtmosphereUpdateOneRequiredWithoutShopAtmospheresNestedInputSchema).optional()
}).strict();

export const ShopAtmosphereUncheckedUpdateInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedUpdateInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  atmosphereId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopAtmosphereCreateManyInputSchema: z.ZodType<Prisma.ShopAtmosphereCreateManyInput> = z.object({
  shopId: z.string(),
  atmosphereId: z.string()
}).strict();

export const ShopAtmosphereUpdateManyMutationInputSchema: z.ZodType<Prisma.ShopAtmosphereUpdateManyMutationInput> = z.object({
}).strict();

export const ShopAtmosphereUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedUpdateManyInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  atmosphereId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopHobbyCreateInputSchema: z.ZodType<Prisma.ShopHobbyCreateInput> = z.object({
  shop: z.lazy(() => ShopCreateNestedOneWithoutShopHobbiesInputSchema),
  hobby: z.lazy(() => HobbyCreateNestedOneWithoutShopHobbiesInputSchema)
}).strict();

export const ShopHobbyUncheckedCreateInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedCreateInput> = z.object({
  shopId: z.string(),
  hobbyId: z.string()
}).strict();

export const ShopHobbyUpdateInputSchema: z.ZodType<Prisma.ShopHobbyUpdateInput> = z.object({
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutShopHobbiesNestedInputSchema).optional(),
  hobby: z.lazy(() => HobbyUpdateOneRequiredWithoutShopHobbiesNestedInputSchema).optional()
}).strict();

export const ShopHobbyUncheckedUpdateInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedUpdateInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hobbyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopHobbyCreateManyInputSchema: z.ZodType<Prisma.ShopHobbyCreateManyInput> = z.object({
  shopId: z.string(),
  hobbyId: z.string()
}).strict();

export const ShopHobbyUpdateManyMutationInputSchema: z.ZodType<Prisma.ShopHobbyUpdateManyMutationInput> = z.object({
}).strict();

export const ShopHobbyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedUpdateManyInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hobbyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopPaymentMethodCreateInputSchema: z.ZodType<Prisma.ShopPaymentMethodCreateInput> = z.object({
  shop: z.lazy(() => ShopCreateNestedOneWithoutShopPaymentMethodsInputSchema),
  paymentMethod: z.lazy(() => PaymentMethodCreateNestedOneWithoutShopPaymentMethodsInputSchema)
}).strict();

export const ShopPaymentMethodUncheckedCreateInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedCreateInput> = z.object({
  shopId: z.string(),
  paymentMethodId: z.string()
}).strict();

export const ShopPaymentMethodUpdateInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateInput> = z.object({
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutShopPaymentMethodsNestedInputSchema).optional(),
  paymentMethod: z.lazy(() => PaymentMethodUpdateOneRequiredWithoutShopPaymentMethodsNestedInputSchema).optional()
}).strict();

export const ShopPaymentMethodUncheckedUpdateInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedUpdateInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethodId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopPaymentMethodCreateManyInputSchema: z.ZodType<Prisma.ShopPaymentMethodCreateManyInput> = z.object({
  shopId: z.string(),
  paymentMethodId: z.string()
}).strict();

export const ShopPaymentMethodUpdateManyMutationInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateManyMutationInput> = z.object({
}).strict();

export const ShopPaymentMethodUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedUpdateManyInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethodId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopEventCreateInputSchema: z.ZodType<Prisma.ShopEventCreateInput> = z.object({
  shop: z.lazy(() => ShopCreateNestedOneWithoutShopEventsInputSchema),
  event: z.lazy(() => EventCreateNestedOneWithoutShopEventsInputSchema)
}).strict();

export const ShopEventUncheckedCreateInputSchema: z.ZodType<Prisma.ShopEventUncheckedCreateInput> = z.object({
  shopId: z.string(),
  eventId: z.string()
}).strict();

export const ShopEventUpdateInputSchema: z.ZodType<Prisma.ShopEventUpdateInput> = z.object({
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutShopEventsNestedInputSchema).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutShopEventsNestedInputSchema).optional()
}).strict();

export const ShopEventUncheckedUpdateInputSchema: z.ZodType<Prisma.ShopEventUncheckedUpdateInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopEventCreateManyInputSchema: z.ZodType<Prisma.ShopEventCreateManyInput> = z.object({
  shopId: z.string(),
  eventId: z.string()
}).strict();

export const ShopEventUpdateManyMutationInputSchema: z.ZodType<Prisma.ShopEventUpdateManyMutationInput> = z.object({
}).strict();

export const ShopEventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ShopEventUncheckedUpdateManyInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewCreateInputSchema: z.ZodType<Prisma.ReviewCreateInput> = z.object({
  id: z.string().cuid().optional(),
  ratingTaste: z.number().optional().nullable(),
  ratingAtmosphere: z.number().optional().nullable(),
  ratingService: z.number().optional().nullable(),
  ratingValue: z.number().optional().nullable(),
  comment: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shop: z.lazy(() => ShopCreateNestedOneWithoutReviewsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  shopId: z.string(),
  userId: z.string().optional().nullable(),
  ratingTaste: z.number().optional().nullable(),
  ratingAtmosphere: z.number().optional().nullable(),
  ratingService: z.number().optional().nullable(),
  ratingValue: z.number().optional().nullable(),
  comment: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReviewUpdateInputSchema: z.ZodType<Prisma.ReviewUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingTaste: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingService: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingValue: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutReviewsNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingTaste: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingService: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingValue: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewCreateManyInputSchema: z.ZodType<Prisma.ReviewCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  shopId: z.string(),
  userId: z.string().optional().nullable(),
  ratingTaste: z.number().optional().nullable(),
  ratingAtmosphere: z.number().optional().nullable(),
  ratingService: z.number().optional().nullable(),
  ratingValue: z.number().optional().nullable(),
  comment: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReviewUpdateManyMutationInputSchema: z.ZodType<Prisma.ReviewUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingTaste: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingService: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingValue: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingTaste: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingService: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingValue: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const PostListRelationFilterSchema: z.ZodType<Prisma.PostListRelationFilter> = z.object({
  every: z.lazy(() => PostWhereInputSchema).optional(),
  some: z.lazy(() => PostWhereInputSchema).optional(),
  none: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const LikeListRelationFilterSchema: z.ZodType<Prisma.LikeListRelationFilter> = z.object({
  every: z.lazy(() => LikeWhereInputSchema).optional(),
  some: z.lazy(() => LikeWhereInputSchema).optional(),
  none: z.lazy(() => LikeWhereInputSchema).optional()
}).strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const ReviewListRelationFilterSchema: z.ZodType<Prisma.ReviewListRelationFilter> = z.object({
  every: z.lazy(() => ReviewWhereInputSchema).optional(),
  some: z.lazy(() => ReviewWhereInputSchema).optional(),
  none: z.lazy(() => ReviewWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LikeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReviewOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PostTagListRelationFilterSchema: z.ZodType<Prisma.PostTagListRelationFilter> = z.object({
  every: z.lazy(() => PostTagWhereInputSchema).optional(),
  some: z.lazy(() => PostTagWhereInputSchema).optional(),
  none: z.lazy(() => PostTagWhereInputSchema).optional()
}).strict();

export const PostTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PostAvgOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostSumOrderByAggregateInputSchema: z.ZodType<Prisma.PostSumOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const PostRelationFilterSchema: z.ZodType<Prisma.PostRelationFilter> = z.object({
  is: z.lazy(() => PostWhereInputSchema).optional(),
  isNot: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const LikeUserIdPostIdCompoundUniqueInputSchema: z.ZodType<Prisma.LikeUserIdPostIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  postId: z.string()
}).strict();

export const LikeCountOrderByAggregateInputSchema: z.ZodType<Prisma.LikeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LikeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeMinOrderByAggregateInputSchema: z.ZodType<Prisma.LikeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagRelationFilterSchema: z.ZodType<Prisma.TagRelationFilter> = z.object({
  is: z.lazy(() => TagWhereInputSchema).optional(),
  isNot: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const PostTagPostIdTagIdCompoundUniqueInputSchema: z.ZodType<Prisma.PostTagPostIdTagIdCompoundUniqueInput> = z.object({
  postId: z.string(),
  tagId: z.string()
}).strict();

export const PostTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostTagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostTagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostTagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ShopFlavorListRelationFilterSchema: z.ZodType<Prisma.ShopFlavorListRelationFilter> = z.object({
  every: z.lazy(() => ShopFlavorWhereInputSchema).optional(),
  some: z.lazy(() => ShopFlavorWhereInputSchema).optional(),
  none: z.lazy(() => ShopFlavorWhereInputSchema).optional()
}).strict();

export const ShopAtmosphereListRelationFilterSchema: z.ZodType<Prisma.ShopAtmosphereListRelationFilter> = z.object({
  every: z.lazy(() => ShopAtmosphereWhereInputSchema).optional(),
  some: z.lazy(() => ShopAtmosphereWhereInputSchema).optional(),
  none: z.lazy(() => ShopAtmosphereWhereInputSchema).optional()
}).strict();

export const ShopHobbyListRelationFilterSchema: z.ZodType<Prisma.ShopHobbyListRelationFilter> = z.object({
  every: z.lazy(() => ShopHobbyWhereInputSchema).optional(),
  some: z.lazy(() => ShopHobbyWhereInputSchema).optional(),
  none: z.lazy(() => ShopHobbyWhereInputSchema).optional()
}).strict();

export const ShopPaymentMethodListRelationFilterSchema: z.ZodType<Prisma.ShopPaymentMethodListRelationFilter> = z.object({
  every: z.lazy(() => ShopPaymentMethodWhereInputSchema).optional(),
  some: z.lazy(() => ShopPaymentMethodWhereInputSchema).optional(),
  none: z.lazy(() => ShopPaymentMethodWhereInputSchema).optional()
}).strict();

export const ShopEventListRelationFilterSchema: z.ZodType<Prisma.ShopEventListRelationFilter> = z.object({
  every: z.lazy(() => ShopEventWhereInputSchema).optional(),
  some: z.lazy(() => ShopEventWhereInputSchema).optional(),
  none: z.lazy(() => ShopEventWhereInputSchema).optional()
}).strict();

export const ShopFlavorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ShopFlavorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopAtmosphereOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ShopAtmosphereOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopHobbyOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ShopHobbyOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopPaymentMethodOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ShopPaymentMethodOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopEventOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ShopEventOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShopCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  nearestStation: z.lazy(() => SortOrderSchema).optional(),
  stationWalkTime: z.lazy(() => SortOrderSchema).optional(),
  openingHours: z.lazy(() => SortOrderSchema).optional(),
  holidays: z.lazy(() => SortOrderSchema).optional(),
  budgetMin: z.lazy(() => SortOrderSchema).optional(),
  budgetMax: z.lazy(() => SortOrderSchema).optional(),
  seatingCount: z.lazy(() => SortOrderSchema).optional(),
  seatingTypes: z.lazy(() => SortOrderSchema).optional(),
  reservation: z.lazy(() => SortOrderSchema).optional(),
  privateBooking: z.lazy(() => SortOrderSchema).optional(),
  wifi: z.lazy(() => SortOrderSchema).optional(),
  powerOutlet: z.lazy(() => SortOrderSchema).optional(),
  smokingPolicy: z.lazy(() => SortOrderSchema).optional(),
  parkingInfo: z.lazy(() => SortOrderSchema).optional(),
  timeLimit: z.lazy(() => SortOrderSchema).optional(),
  hookahBrand: z.lazy(() => SortOrderSchema).optional(),
  flavorCount: z.lazy(() => SortOrderSchema).optional(),
  photos: z.lazy(() => SortOrderSchema).optional(),
  websiteUrl: z.lazy(() => SortOrderSchema).optional(),
  googleMapUrl: z.lazy(() => SortOrderSchema).optional(),
  snsLinks: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ShopAvgOrderByAggregateInput> = z.object({
  stationWalkTime: z.lazy(() => SortOrderSchema).optional(),
  budgetMin: z.lazy(() => SortOrderSchema).optional(),
  budgetMax: z.lazy(() => SortOrderSchema).optional(),
  seatingCount: z.lazy(() => SortOrderSchema).optional(),
  flavorCount: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShopMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  nearestStation: z.lazy(() => SortOrderSchema).optional(),
  stationWalkTime: z.lazy(() => SortOrderSchema).optional(),
  openingHours: z.lazy(() => SortOrderSchema).optional(),
  holidays: z.lazy(() => SortOrderSchema).optional(),
  budgetMin: z.lazy(() => SortOrderSchema).optional(),
  budgetMax: z.lazy(() => SortOrderSchema).optional(),
  seatingCount: z.lazy(() => SortOrderSchema).optional(),
  seatingTypes: z.lazy(() => SortOrderSchema).optional(),
  reservation: z.lazy(() => SortOrderSchema).optional(),
  privateBooking: z.lazy(() => SortOrderSchema).optional(),
  wifi: z.lazy(() => SortOrderSchema).optional(),
  powerOutlet: z.lazy(() => SortOrderSchema).optional(),
  smokingPolicy: z.lazy(() => SortOrderSchema).optional(),
  parkingInfo: z.lazy(() => SortOrderSchema).optional(),
  timeLimit: z.lazy(() => SortOrderSchema).optional(),
  hookahBrand: z.lazy(() => SortOrderSchema).optional(),
  flavorCount: z.lazy(() => SortOrderSchema).optional(),
  photos: z.lazy(() => SortOrderSchema).optional(),
  websiteUrl: z.lazy(() => SortOrderSchema).optional(),
  googleMapUrl: z.lazy(() => SortOrderSchema).optional(),
  snsLinks: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShopMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  nearestStation: z.lazy(() => SortOrderSchema).optional(),
  stationWalkTime: z.lazy(() => SortOrderSchema).optional(),
  openingHours: z.lazy(() => SortOrderSchema).optional(),
  holidays: z.lazy(() => SortOrderSchema).optional(),
  budgetMin: z.lazy(() => SortOrderSchema).optional(),
  budgetMax: z.lazy(() => SortOrderSchema).optional(),
  seatingCount: z.lazy(() => SortOrderSchema).optional(),
  seatingTypes: z.lazy(() => SortOrderSchema).optional(),
  reservation: z.lazy(() => SortOrderSchema).optional(),
  privateBooking: z.lazy(() => SortOrderSchema).optional(),
  wifi: z.lazy(() => SortOrderSchema).optional(),
  powerOutlet: z.lazy(() => SortOrderSchema).optional(),
  smokingPolicy: z.lazy(() => SortOrderSchema).optional(),
  parkingInfo: z.lazy(() => SortOrderSchema).optional(),
  timeLimit: z.lazy(() => SortOrderSchema).optional(),
  hookahBrand: z.lazy(() => SortOrderSchema).optional(),
  flavorCount: z.lazy(() => SortOrderSchema).optional(),
  photos: z.lazy(() => SortOrderSchema).optional(),
  websiteUrl: z.lazy(() => SortOrderSchema).optional(),
  googleMapUrl: z.lazy(() => SortOrderSchema).optional(),
  snsLinks: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopSumOrderByAggregateInputSchema: z.ZodType<Prisma.ShopSumOrderByAggregateInput> = z.object({
  stationWalkTime: z.lazy(() => SortOrderSchema).optional(),
  budgetMin: z.lazy(() => SortOrderSchema).optional(),
  budgetMax: z.lazy(() => SortOrderSchema).optional(),
  seatingCount: z.lazy(() => SortOrderSchema).optional(),
  flavorCount: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const FlavorCountOrderByAggregateInputSchema: z.ZodType<Prisma.FlavorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlavorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FlavorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlavorMinOrderByAggregateInputSchema: z.ZodType<Prisma.FlavorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AtmosphereCountOrderByAggregateInputSchema: z.ZodType<Prisma.AtmosphereCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AtmosphereMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AtmosphereMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AtmosphereMinOrderByAggregateInputSchema: z.ZodType<Prisma.AtmosphereMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HobbyCountOrderByAggregateInputSchema: z.ZodType<Prisma.HobbyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HobbyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HobbyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HobbyMinOrderByAggregateInputSchema: z.ZodType<Prisma.HobbyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMethodCountOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMethodCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMethodMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMethodMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMethodMinOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMethodMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  schedule: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  schedule: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  schedule: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopRelationFilterSchema: z.ZodType<Prisma.ShopRelationFilter> = z.object({
  is: z.lazy(() => ShopWhereInputSchema).optional(),
  isNot: z.lazy(() => ShopWhereInputSchema).optional()
}).strict();

export const FlavorRelationFilterSchema: z.ZodType<Prisma.FlavorRelationFilter> = z.object({
  is: z.lazy(() => FlavorWhereInputSchema).optional(),
  isNot: z.lazy(() => FlavorWhereInputSchema).optional()
}).strict();

export const ShopFlavorShopIdFlavorIdCompoundUniqueInputSchema: z.ZodType<Prisma.ShopFlavorShopIdFlavorIdCompoundUniqueInput> = z.object({
  shopId: z.string(),
  flavorId: z.string()
}).strict();

export const ShopFlavorCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShopFlavorCountOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  flavorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopFlavorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShopFlavorMaxOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  flavorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopFlavorMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShopFlavorMinOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  flavorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AtmosphereRelationFilterSchema: z.ZodType<Prisma.AtmosphereRelationFilter> = z.object({
  is: z.lazy(() => AtmosphereWhereInputSchema).optional(),
  isNot: z.lazy(() => AtmosphereWhereInputSchema).optional()
}).strict();

export const ShopAtmosphereShopIdAtmosphereIdCompoundUniqueInputSchema: z.ZodType<Prisma.ShopAtmosphereShopIdAtmosphereIdCompoundUniqueInput> = z.object({
  shopId: z.string(),
  atmosphereId: z.string()
}).strict();

export const ShopAtmosphereCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShopAtmosphereCountOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  atmosphereId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopAtmosphereMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShopAtmosphereMaxOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  atmosphereId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopAtmosphereMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShopAtmosphereMinOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  atmosphereId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HobbyRelationFilterSchema: z.ZodType<Prisma.HobbyRelationFilter> = z.object({
  is: z.lazy(() => HobbyWhereInputSchema).optional(),
  isNot: z.lazy(() => HobbyWhereInputSchema).optional()
}).strict();

export const ShopHobbyShopIdHobbyIdCompoundUniqueInputSchema: z.ZodType<Prisma.ShopHobbyShopIdHobbyIdCompoundUniqueInput> = z.object({
  shopId: z.string(),
  hobbyId: z.string()
}).strict();

export const ShopHobbyCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShopHobbyCountOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  hobbyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopHobbyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShopHobbyMaxOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  hobbyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopHobbyMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShopHobbyMinOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  hobbyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMethodRelationFilterSchema: z.ZodType<Prisma.PaymentMethodRelationFilter> = z.object({
  is: z.lazy(() => PaymentMethodWhereInputSchema).optional(),
  isNot: z.lazy(() => PaymentMethodWhereInputSchema).optional()
}).strict();

export const ShopPaymentMethodShopIdPaymentMethodIdCompoundUniqueInputSchema: z.ZodType<Prisma.ShopPaymentMethodShopIdPaymentMethodIdCompoundUniqueInput> = z.object({
  shopId: z.string(),
  paymentMethodId: z.string()
}).strict();

export const ShopPaymentMethodCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShopPaymentMethodCountOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  paymentMethodId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopPaymentMethodMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShopPaymentMethodMaxOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  paymentMethodId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopPaymentMethodMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShopPaymentMethodMinOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  paymentMethodId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventRelationFilterSchema: z.ZodType<Prisma.EventRelationFilter> = z.object({
  is: z.lazy(() => EventWhereInputSchema).optional(),
  isNot: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const ShopEventShopIdEventIdCompoundUniqueInputSchema: z.ZodType<Prisma.ShopEventShopIdEventIdCompoundUniqueInput> = z.object({
  shopId: z.string(),
  eventId: z.string()
}).strict();

export const ShopEventCountOrderByAggregateInputSchema: z.ZodType<Prisma.ShopEventCountOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopEventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ShopEventMaxOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ShopEventMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShopEventMinOrderByAggregateInput> = z.object({
  shopId: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const ReviewCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  shopId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  ratingTaste: z.lazy(() => SortOrderSchema).optional(),
  ratingAtmosphere: z.lazy(() => SortOrderSchema).optional(),
  ratingService: z.lazy(() => SortOrderSchema).optional(),
  ratingValue: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewAvgOrderByAggregateInput> = z.object({
  ratingTaste: z.lazy(() => SortOrderSchema).optional(),
  ratingAtmosphere: z.lazy(() => SortOrderSchema).optional(),
  ratingService: z.lazy(() => SortOrderSchema).optional(),
  ratingValue: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  shopId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  ratingTaste: z.lazy(() => SortOrderSchema).optional(),
  ratingAtmosphere: z.lazy(() => SortOrderSchema).optional(),
  ratingService: z.lazy(() => SortOrderSchema).optional(),
  ratingValue: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  shopId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  ratingTaste: z.lazy(() => SortOrderSchema).optional(),
  ratingAtmosphere: z.lazy(() => SortOrderSchema).optional(),
  ratingService: z.lazy(() => SortOrderSchema).optional(),
  ratingValue: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewSumOrderByAggregateInput> = z.object({
  ratingTaste: z.lazy(() => SortOrderSchema).optional(),
  ratingAtmosphere: z.lazy(() => SortOrderSchema).optional(),
  ratingService: z.lazy(() => SortOrderSchema).optional(),
  ratingValue: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LikeCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeCreateWithoutUserInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeCreateWithoutUserInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const PostUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LikeUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeCreateWithoutUserInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeCreateWithoutUserInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const LikeCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.LikeCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeCreateWithoutPostInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostTagCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.PostTagCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema),z.lazy(() => PostTagCreateWithoutPostInputSchema).array(),z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema),z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.LikeUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeCreateWithoutPostInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostTagUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema),z.lazy(() => PostTagCreateWithoutPostInputSchema).array(),z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema),z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const LikeUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.LikeUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeCreateWithoutPostInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostTagUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema),z.lazy(() => PostTagCreateWithoutPostInputSchema).array(),z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema),z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostTagScalarWhereInputSchema),z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeCreateWithoutPostInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostTagUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema),z.lazy(() => PostTagCreateWithoutPostInputSchema).array(),z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema),z.lazy(() => PostTagCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => PostTagUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => PostTagUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => PostTagUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostTagScalarWhereInputSchema),z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PostCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLikesInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => UserUpdateWithoutLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const PostUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLikesInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => PostUpdateWithoutLikesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PostCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const PostUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const PostTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.PostTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema),z.lazy(() => PostTagCreateWithoutTagInputSchema).array(),z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema),z.lazy(() => PostTagCreateWithoutTagInputSchema).array(),z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema),z.lazy(() => PostTagCreateWithoutTagInputSchema).array(),z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostTagScalarWhereInputSchema),z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema),z.lazy(() => PostTagCreateWithoutTagInputSchema).array(),z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => PostTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => PostTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostTagWhereUniqueInputSchema),z.lazy(() => PostTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => PostTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => PostTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostTagScalarWhereInputSchema),z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutTagsInputSchema),z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const TagCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutPostsInputSchema),z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const PostUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutTagsInputSchema),z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => PostUpdateWithoutTagsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const TagUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutPostsInputSchema),z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => TagUpdateWithoutPostsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const ShopFlavorCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutShopInputSchema),z.lazy(() => ShopFlavorCreateWithoutShopInputSchema).array(),z.lazy(() => ShopFlavorUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopFlavorCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopFlavorCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopFlavorCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopAtmosphereCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereCreateWithoutShopInputSchema).array(),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopAtmosphereCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopAtmosphereCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopAtmosphereCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopHobbyCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutShopInputSchema),z.lazy(() => ShopHobbyCreateWithoutShopInputSchema).array(),z.lazy(() => ShopHobbyUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopHobbyCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopHobbyCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopHobbyCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopPaymentMethodCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodCreateWithoutShopInputSchema).array(),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopPaymentMethodCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopEventCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ShopEventCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ShopEventCreateWithoutShopInputSchema),z.lazy(() => ShopEventCreateWithoutShopInputSchema).array(),z.lazy(() => ShopEventUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopEventCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopEventCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopEventCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutShopInputSchema),z.lazy(() => ReviewCreateWithoutShopInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutShopInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutShopInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopFlavorUncheckedCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutShopInputSchema),z.lazy(() => ShopFlavorCreateWithoutShopInputSchema).array(),z.lazy(() => ShopFlavorUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopFlavorCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopFlavorCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopFlavorCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopAtmosphereUncheckedCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereCreateWithoutShopInputSchema).array(),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopAtmosphereCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopAtmosphereCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopAtmosphereCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopHobbyUncheckedCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutShopInputSchema),z.lazy(() => ShopHobbyCreateWithoutShopInputSchema).array(),z.lazy(() => ShopHobbyUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopHobbyCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopHobbyCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopHobbyCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopPaymentMethodUncheckedCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodCreateWithoutShopInputSchema).array(),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopPaymentMethodCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopEventUncheckedCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ShopEventUncheckedCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ShopEventCreateWithoutShopInputSchema),z.lazy(() => ShopEventCreateWithoutShopInputSchema).array(),z.lazy(() => ShopEventUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopEventCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopEventCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopEventCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedCreateNestedManyWithoutShopInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutShopInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutShopInputSchema),z.lazy(() => ReviewCreateWithoutShopInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutShopInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutShopInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyShopInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ShopFlavorUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ShopFlavorUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutShopInputSchema),z.lazy(() => ShopFlavorCreateWithoutShopInputSchema).array(),z.lazy(() => ShopFlavorUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopFlavorCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopFlavorCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopFlavorUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopFlavorUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopFlavorCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopFlavorUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopFlavorUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopFlavorUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ShopFlavorUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopFlavorScalarWhereInputSchema),z.lazy(() => ShopFlavorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopAtmosphereUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ShopAtmosphereUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereCreateWithoutShopInputSchema).array(),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopAtmosphereCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopAtmosphereCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopAtmosphereUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopAtmosphereCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopAtmosphereUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopAtmosphereUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopAtmosphereScalarWhereInputSchema),z.lazy(() => ShopAtmosphereScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopHobbyUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ShopHobbyUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutShopInputSchema),z.lazy(() => ShopHobbyCreateWithoutShopInputSchema).array(),z.lazy(() => ShopHobbyUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopHobbyCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopHobbyCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopHobbyUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopHobbyUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopHobbyCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopHobbyUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopHobbyUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopHobbyUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ShopHobbyUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopHobbyScalarWhereInputSchema),z.lazy(() => ShopHobbyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopPaymentMethodUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodCreateWithoutShopInputSchema).array(),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopPaymentMethodUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopPaymentMethodCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopPaymentMethodUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopPaymentMethodUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopPaymentMethodScalarWhereInputSchema),z.lazy(() => ShopPaymentMethodScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopEventUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ShopEventUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopEventCreateWithoutShopInputSchema),z.lazy(() => ShopEventCreateWithoutShopInputSchema).array(),z.lazy(() => ShopEventUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopEventCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopEventCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopEventUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopEventUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopEventCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopEventUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopEventUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopEventUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ShopEventUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopEventScalarWhereInputSchema),z.lazy(() => ShopEventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutShopInputSchema),z.lazy(() => ReviewCreateWithoutShopInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutShopInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutShopInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopFlavorUncheckedUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutShopInputSchema),z.lazy(() => ShopFlavorCreateWithoutShopInputSchema).array(),z.lazy(() => ShopFlavorUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopFlavorCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopFlavorCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopFlavorUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopFlavorUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopFlavorCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopFlavorUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopFlavorUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopFlavorUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ShopFlavorUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopFlavorScalarWhereInputSchema),z.lazy(() => ShopFlavorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopAtmosphereUncheckedUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereCreateWithoutShopInputSchema).array(),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopAtmosphereCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopAtmosphereCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopAtmosphereUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopAtmosphereCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopAtmosphereUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopAtmosphereUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopAtmosphereScalarWhereInputSchema),z.lazy(() => ShopAtmosphereScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopHobbyUncheckedUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutShopInputSchema),z.lazy(() => ShopHobbyCreateWithoutShopInputSchema).array(),z.lazy(() => ShopHobbyUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopHobbyCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopHobbyCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopHobbyUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopHobbyUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopHobbyCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopHobbyUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopHobbyUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopHobbyUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ShopHobbyUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopHobbyScalarWhereInputSchema),z.lazy(() => ShopHobbyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopPaymentMethodUncheckedUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodCreateWithoutShopInputSchema).array(),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopPaymentMethodUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopPaymentMethodCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopPaymentMethodUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopPaymentMethodUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopPaymentMethodScalarWhereInputSchema),z.lazy(() => ShopPaymentMethodScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopEventUncheckedUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ShopEventUncheckedUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopEventCreateWithoutShopInputSchema),z.lazy(() => ShopEventCreateWithoutShopInputSchema).array(),z.lazy(() => ShopEventUncheckedCreateWithoutShopInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopEventCreateOrConnectWithoutShopInputSchema),z.lazy(() => ShopEventCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopEventUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopEventUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopEventCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopEventUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ShopEventUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopEventUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ShopEventUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopEventScalarWhereInputSchema),z.lazy(() => ShopEventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutShopNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutShopNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutShopInputSchema),z.lazy(() => ReviewCreateWithoutShopInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutShopInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShopInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutShopInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutShopInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyShopInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutShopInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutShopInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutShopInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutShopInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopFlavorCreateNestedManyWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorCreateNestedManyWithoutFlavorInput> = z.object({
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorCreateWithoutFlavorInputSchema).array(),z.lazy(() => ShopFlavorUncheckedCreateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutFlavorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopFlavorCreateOrConnectWithoutFlavorInputSchema),z.lazy(() => ShopFlavorCreateOrConnectWithoutFlavorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopFlavorCreateManyFlavorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopFlavorUncheckedCreateNestedManyWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedCreateNestedManyWithoutFlavorInput> = z.object({
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorCreateWithoutFlavorInputSchema).array(),z.lazy(() => ShopFlavorUncheckedCreateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutFlavorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopFlavorCreateOrConnectWithoutFlavorInputSchema),z.lazy(() => ShopFlavorCreateOrConnectWithoutFlavorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopFlavorCreateManyFlavorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopFlavorUpdateManyWithoutFlavorNestedInputSchema: z.ZodType<Prisma.ShopFlavorUpdateManyWithoutFlavorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorCreateWithoutFlavorInputSchema).array(),z.lazy(() => ShopFlavorUncheckedCreateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutFlavorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopFlavorCreateOrConnectWithoutFlavorInputSchema),z.lazy(() => ShopFlavorCreateOrConnectWithoutFlavorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopFlavorUpsertWithWhereUniqueWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUpsertWithWhereUniqueWithoutFlavorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopFlavorCreateManyFlavorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopFlavorUpdateWithWhereUniqueWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUpdateWithWhereUniqueWithoutFlavorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopFlavorUpdateManyWithWhereWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUpdateManyWithWhereWithoutFlavorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopFlavorScalarWhereInputSchema),z.lazy(() => ShopFlavorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopFlavorUncheckedUpdateManyWithoutFlavorNestedInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedUpdateManyWithoutFlavorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorCreateWithoutFlavorInputSchema).array(),z.lazy(() => ShopFlavorUncheckedCreateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutFlavorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopFlavorCreateOrConnectWithoutFlavorInputSchema),z.lazy(() => ShopFlavorCreateOrConnectWithoutFlavorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopFlavorUpsertWithWhereUniqueWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUpsertWithWhereUniqueWithoutFlavorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopFlavorCreateManyFlavorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopFlavorWhereUniqueInputSchema),z.lazy(() => ShopFlavorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopFlavorUpdateWithWhereUniqueWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUpdateWithWhereUniqueWithoutFlavorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopFlavorUpdateManyWithWhereWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUpdateManyWithWhereWithoutFlavorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopFlavorScalarWhereInputSchema),z.lazy(() => ShopFlavorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopAtmosphereCreateNestedManyWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereCreateNestedManyWithoutAtmosphereInput> = z.object({
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereCreateWithoutAtmosphereInputSchema).array(),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopAtmosphereCreateOrConnectWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereCreateOrConnectWithoutAtmosphereInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopAtmosphereCreateManyAtmosphereInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopAtmosphereUncheckedCreateNestedManyWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedCreateNestedManyWithoutAtmosphereInput> = z.object({
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereCreateWithoutAtmosphereInputSchema).array(),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopAtmosphereCreateOrConnectWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereCreateOrConnectWithoutAtmosphereInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopAtmosphereCreateManyAtmosphereInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopAtmosphereUpdateManyWithoutAtmosphereNestedInputSchema: z.ZodType<Prisma.ShopAtmosphereUpdateManyWithoutAtmosphereNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereCreateWithoutAtmosphereInputSchema).array(),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopAtmosphereCreateOrConnectWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereCreateOrConnectWithoutAtmosphereInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopAtmosphereUpsertWithWhereUniqueWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUpsertWithWhereUniqueWithoutAtmosphereInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopAtmosphereCreateManyAtmosphereInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopAtmosphereUpdateWithWhereUniqueWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUpdateWithWhereUniqueWithoutAtmosphereInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopAtmosphereUpdateManyWithWhereWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUpdateManyWithWhereWithoutAtmosphereInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopAtmosphereScalarWhereInputSchema),z.lazy(() => ShopAtmosphereScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopAtmosphereUncheckedUpdateManyWithoutAtmosphereNestedInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedUpdateManyWithoutAtmosphereNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereCreateWithoutAtmosphereInputSchema).array(),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopAtmosphereCreateOrConnectWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereCreateOrConnectWithoutAtmosphereInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopAtmosphereUpsertWithWhereUniqueWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUpsertWithWhereUniqueWithoutAtmosphereInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopAtmosphereCreateManyAtmosphereInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),z.lazy(() => ShopAtmosphereWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopAtmosphereUpdateWithWhereUniqueWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUpdateWithWhereUniqueWithoutAtmosphereInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopAtmosphereUpdateManyWithWhereWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUpdateManyWithWhereWithoutAtmosphereInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopAtmosphereScalarWhereInputSchema),z.lazy(() => ShopAtmosphereScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopHobbyCreateNestedManyWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyCreateNestedManyWithoutHobbyInput> = z.object({
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyCreateWithoutHobbyInputSchema).array(),z.lazy(() => ShopHobbyUncheckedCreateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutHobbyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopHobbyCreateOrConnectWithoutHobbyInputSchema),z.lazy(() => ShopHobbyCreateOrConnectWithoutHobbyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopHobbyCreateManyHobbyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopHobbyUncheckedCreateNestedManyWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedCreateNestedManyWithoutHobbyInput> = z.object({
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyCreateWithoutHobbyInputSchema).array(),z.lazy(() => ShopHobbyUncheckedCreateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutHobbyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopHobbyCreateOrConnectWithoutHobbyInputSchema),z.lazy(() => ShopHobbyCreateOrConnectWithoutHobbyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopHobbyCreateManyHobbyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopHobbyUpdateManyWithoutHobbyNestedInputSchema: z.ZodType<Prisma.ShopHobbyUpdateManyWithoutHobbyNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyCreateWithoutHobbyInputSchema).array(),z.lazy(() => ShopHobbyUncheckedCreateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutHobbyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopHobbyCreateOrConnectWithoutHobbyInputSchema),z.lazy(() => ShopHobbyCreateOrConnectWithoutHobbyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopHobbyUpsertWithWhereUniqueWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUpsertWithWhereUniqueWithoutHobbyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopHobbyCreateManyHobbyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopHobbyUpdateWithWhereUniqueWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUpdateWithWhereUniqueWithoutHobbyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopHobbyUpdateManyWithWhereWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUpdateManyWithWhereWithoutHobbyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopHobbyScalarWhereInputSchema),z.lazy(() => ShopHobbyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopHobbyUncheckedUpdateManyWithoutHobbyNestedInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedUpdateManyWithoutHobbyNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyCreateWithoutHobbyInputSchema).array(),z.lazy(() => ShopHobbyUncheckedCreateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutHobbyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopHobbyCreateOrConnectWithoutHobbyInputSchema),z.lazy(() => ShopHobbyCreateOrConnectWithoutHobbyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopHobbyUpsertWithWhereUniqueWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUpsertWithWhereUniqueWithoutHobbyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopHobbyCreateManyHobbyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopHobbyWhereUniqueInputSchema),z.lazy(() => ShopHobbyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopHobbyUpdateWithWhereUniqueWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUpdateWithWhereUniqueWithoutHobbyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopHobbyUpdateManyWithWhereWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUpdateManyWithWhereWithoutHobbyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopHobbyScalarWhereInputSchema),z.lazy(() => ShopHobbyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopPaymentMethodCreateNestedManyWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodCreateNestedManyWithoutPaymentMethodInput> = z.object({
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodCreateWithoutPaymentMethodInputSchema).array(),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutPaymentMethodInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopPaymentMethodCreateManyPaymentMethodInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopPaymentMethodUncheckedCreateNestedManyWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedCreateNestedManyWithoutPaymentMethodInput> = z.object({
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodCreateWithoutPaymentMethodInputSchema).array(),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutPaymentMethodInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopPaymentMethodCreateManyPaymentMethodInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopPaymentMethodUpdateManyWithoutPaymentMethodNestedInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateManyWithoutPaymentMethodNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodCreateWithoutPaymentMethodInputSchema).array(),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutPaymentMethodInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopPaymentMethodUpsertWithWhereUniqueWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUpsertWithWhereUniqueWithoutPaymentMethodInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopPaymentMethodCreateManyPaymentMethodInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopPaymentMethodUpdateWithWhereUniqueWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUpdateWithWhereUniqueWithoutPaymentMethodInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopPaymentMethodUpdateManyWithWhereWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUpdateManyWithWhereWithoutPaymentMethodInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopPaymentMethodScalarWhereInputSchema),z.lazy(() => ShopPaymentMethodScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopPaymentMethodUncheckedUpdateManyWithoutPaymentMethodNestedInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedUpdateManyWithoutPaymentMethodNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodCreateWithoutPaymentMethodInputSchema).array(),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodCreateOrConnectWithoutPaymentMethodInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopPaymentMethodUpsertWithWhereUniqueWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUpsertWithWhereUniqueWithoutPaymentMethodInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopPaymentMethodCreateManyPaymentMethodInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopPaymentMethodUpdateWithWhereUniqueWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUpdateWithWhereUniqueWithoutPaymentMethodInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopPaymentMethodUpdateManyWithWhereWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUpdateManyWithWhereWithoutPaymentMethodInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopPaymentMethodScalarWhereInputSchema),z.lazy(() => ShopPaymentMethodScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopEventCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.ShopEventCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => ShopEventCreateWithoutEventInputSchema),z.lazy(() => ShopEventCreateWithoutEventInputSchema).array(),z.lazy(() => ShopEventUncheckedCreateWithoutEventInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopEventCreateOrConnectWithoutEventInputSchema),z.lazy(() => ShopEventCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopEventCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopEventUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.ShopEventUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => ShopEventCreateWithoutEventInputSchema),z.lazy(() => ShopEventCreateWithoutEventInputSchema).array(),z.lazy(() => ShopEventUncheckedCreateWithoutEventInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopEventCreateOrConnectWithoutEventInputSchema),z.lazy(() => ShopEventCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopEventCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ShopEventUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.ShopEventUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopEventCreateWithoutEventInputSchema),z.lazy(() => ShopEventCreateWithoutEventInputSchema).array(),z.lazy(() => ShopEventUncheckedCreateWithoutEventInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopEventCreateOrConnectWithoutEventInputSchema),z.lazy(() => ShopEventCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopEventUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => ShopEventUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopEventCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopEventUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => ShopEventUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopEventUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => ShopEventUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopEventScalarWhereInputSchema),z.lazy(() => ShopEventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopEventUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.ShopEventUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopEventCreateWithoutEventInputSchema),z.lazy(() => ShopEventCreateWithoutEventInputSchema).array(),z.lazy(() => ShopEventUncheckedCreateWithoutEventInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShopEventCreateOrConnectWithoutEventInputSchema),z.lazy(() => ShopEventCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShopEventUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => ShopEventUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ShopEventCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShopEventWhereUniqueInputSchema),z.lazy(() => ShopEventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShopEventUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => ShopEventUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShopEventUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => ShopEventUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShopEventScalarWhereInputSchema),z.lazy(() => ShopEventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ShopCreateNestedOneWithoutShopFlavorsInputSchema: z.ZodType<Prisma.ShopCreateNestedOneWithoutShopFlavorsInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutShopFlavorsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopFlavorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutShopFlavorsInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional()
}).strict();

export const FlavorCreateNestedOneWithoutShopFlavorsInputSchema: z.ZodType<Prisma.FlavorCreateNestedOneWithoutShopFlavorsInput> = z.object({
  create: z.union([ z.lazy(() => FlavorCreateWithoutShopFlavorsInputSchema),z.lazy(() => FlavorUncheckedCreateWithoutShopFlavorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FlavorCreateOrConnectWithoutShopFlavorsInputSchema).optional(),
  connect: z.lazy(() => FlavorWhereUniqueInputSchema).optional()
}).strict();

export const ShopUpdateOneRequiredWithoutShopFlavorsNestedInputSchema: z.ZodType<Prisma.ShopUpdateOneRequiredWithoutShopFlavorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutShopFlavorsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopFlavorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutShopFlavorsInputSchema).optional(),
  upsert: z.lazy(() => ShopUpsertWithoutShopFlavorsInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShopUpdateToOneWithWhereWithoutShopFlavorsInputSchema),z.lazy(() => ShopUpdateWithoutShopFlavorsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopFlavorsInputSchema) ]).optional(),
}).strict();

export const FlavorUpdateOneRequiredWithoutShopFlavorsNestedInputSchema: z.ZodType<Prisma.FlavorUpdateOneRequiredWithoutShopFlavorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlavorCreateWithoutShopFlavorsInputSchema),z.lazy(() => FlavorUncheckedCreateWithoutShopFlavorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FlavorCreateOrConnectWithoutShopFlavorsInputSchema).optional(),
  upsert: z.lazy(() => FlavorUpsertWithoutShopFlavorsInputSchema).optional(),
  connect: z.lazy(() => FlavorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FlavorUpdateToOneWithWhereWithoutShopFlavorsInputSchema),z.lazy(() => FlavorUpdateWithoutShopFlavorsInputSchema),z.lazy(() => FlavorUncheckedUpdateWithoutShopFlavorsInputSchema) ]).optional(),
}).strict();

export const ShopCreateNestedOneWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.ShopCreateNestedOneWithoutShopAtmospheresInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutShopAtmospheresInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopAtmospheresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutShopAtmospheresInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional()
}).strict();

export const AtmosphereCreateNestedOneWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.AtmosphereCreateNestedOneWithoutShopAtmospheresInput> = z.object({
  create: z.union([ z.lazy(() => AtmosphereCreateWithoutShopAtmospheresInputSchema),z.lazy(() => AtmosphereUncheckedCreateWithoutShopAtmospheresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AtmosphereCreateOrConnectWithoutShopAtmospheresInputSchema).optional(),
  connect: z.lazy(() => AtmosphereWhereUniqueInputSchema).optional()
}).strict();

export const ShopUpdateOneRequiredWithoutShopAtmospheresNestedInputSchema: z.ZodType<Prisma.ShopUpdateOneRequiredWithoutShopAtmospheresNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutShopAtmospheresInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopAtmospheresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutShopAtmospheresInputSchema).optional(),
  upsert: z.lazy(() => ShopUpsertWithoutShopAtmospheresInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShopUpdateToOneWithWhereWithoutShopAtmospheresInputSchema),z.lazy(() => ShopUpdateWithoutShopAtmospheresInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopAtmospheresInputSchema) ]).optional(),
}).strict();

export const AtmosphereUpdateOneRequiredWithoutShopAtmospheresNestedInputSchema: z.ZodType<Prisma.AtmosphereUpdateOneRequiredWithoutShopAtmospheresNestedInput> = z.object({
  create: z.union([ z.lazy(() => AtmosphereCreateWithoutShopAtmospheresInputSchema),z.lazy(() => AtmosphereUncheckedCreateWithoutShopAtmospheresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AtmosphereCreateOrConnectWithoutShopAtmospheresInputSchema).optional(),
  upsert: z.lazy(() => AtmosphereUpsertWithoutShopAtmospheresInputSchema).optional(),
  connect: z.lazy(() => AtmosphereWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AtmosphereUpdateToOneWithWhereWithoutShopAtmospheresInputSchema),z.lazy(() => AtmosphereUpdateWithoutShopAtmospheresInputSchema),z.lazy(() => AtmosphereUncheckedUpdateWithoutShopAtmospheresInputSchema) ]).optional(),
}).strict();

export const ShopCreateNestedOneWithoutShopHobbiesInputSchema: z.ZodType<Prisma.ShopCreateNestedOneWithoutShopHobbiesInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutShopHobbiesInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopHobbiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutShopHobbiesInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional()
}).strict();

export const HobbyCreateNestedOneWithoutShopHobbiesInputSchema: z.ZodType<Prisma.HobbyCreateNestedOneWithoutShopHobbiesInput> = z.object({
  create: z.union([ z.lazy(() => HobbyCreateWithoutShopHobbiesInputSchema),z.lazy(() => HobbyUncheckedCreateWithoutShopHobbiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HobbyCreateOrConnectWithoutShopHobbiesInputSchema).optional(),
  connect: z.lazy(() => HobbyWhereUniqueInputSchema).optional()
}).strict();

export const ShopUpdateOneRequiredWithoutShopHobbiesNestedInputSchema: z.ZodType<Prisma.ShopUpdateOneRequiredWithoutShopHobbiesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutShopHobbiesInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopHobbiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutShopHobbiesInputSchema).optional(),
  upsert: z.lazy(() => ShopUpsertWithoutShopHobbiesInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShopUpdateToOneWithWhereWithoutShopHobbiesInputSchema),z.lazy(() => ShopUpdateWithoutShopHobbiesInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopHobbiesInputSchema) ]).optional(),
}).strict();

export const HobbyUpdateOneRequiredWithoutShopHobbiesNestedInputSchema: z.ZodType<Prisma.HobbyUpdateOneRequiredWithoutShopHobbiesNestedInput> = z.object({
  create: z.union([ z.lazy(() => HobbyCreateWithoutShopHobbiesInputSchema),z.lazy(() => HobbyUncheckedCreateWithoutShopHobbiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HobbyCreateOrConnectWithoutShopHobbiesInputSchema).optional(),
  upsert: z.lazy(() => HobbyUpsertWithoutShopHobbiesInputSchema).optional(),
  connect: z.lazy(() => HobbyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => HobbyUpdateToOneWithWhereWithoutShopHobbiesInputSchema),z.lazy(() => HobbyUpdateWithoutShopHobbiesInputSchema),z.lazy(() => HobbyUncheckedUpdateWithoutShopHobbiesInputSchema) ]).optional(),
}).strict();

export const ShopCreateNestedOneWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.ShopCreateNestedOneWithoutShopPaymentMethodsInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutShopPaymentMethodsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopPaymentMethodsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutShopPaymentMethodsInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional()
}).strict();

export const PaymentMethodCreateNestedOneWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.PaymentMethodCreateNestedOneWithoutShopPaymentMethodsInput> = z.object({
  create: z.union([ z.lazy(() => PaymentMethodCreateWithoutShopPaymentMethodsInputSchema),z.lazy(() => PaymentMethodUncheckedCreateWithoutShopPaymentMethodsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentMethodCreateOrConnectWithoutShopPaymentMethodsInputSchema).optional(),
  connect: z.lazy(() => PaymentMethodWhereUniqueInputSchema).optional()
}).strict();

export const ShopUpdateOneRequiredWithoutShopPaymentMethodsNestedInputSchema: z.ZodType<Prisma.ShopUpdateOneRequiredWithoutShopPaymentMethodsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutShopPaymentMethodsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopPaymentMethodsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutShopPaymentMethodsInputSchema).optional(),
  upsert: z.lazy(() => ShopUpsertWithoutShopPaymentMethodsInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShopUpdateToOneWithWhereWithoutShopPaymentMethodsInputSchema),z.lazy(() => ShopUpdateWithoutShopPaymentMethodsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopPaymentMethodsInputSchema) ]).optional(),
}).strict();

export const PaymentMethodUpdateOneRequiredWithoutShopPaymentMethodsNestedInputSchema: z.ZodType<Prisma.PaymentMethodUpdateOneRequiredWithoutShopPaymentMethodsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentMethodCreateWithoutShopPaymentMethodsInputSchema),z.lazy(() => PaymentMethodUncheckedCreateWithoutShopPaymentMethodsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentMethodCreateOrConnectWithoutShopPaymentMethodsInputSchema).optional(),
  upsert: z.lazy(() => PaymentMethodUpsertWithoutShopPaymentMethodsInputSchema).optional(),
  connect: z.lazy(() => PaymentMethodWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PaymentMethodUpdateToOneWithWhereWithoutShopPaymentMethodsInputSchema),z.lazy(() => PaymentMethodUpdateWithoutShopPaymentMethodsInputSchema),z.lazy(() => PaymentMethodUncheckedUpdateWithoutShopPaymentMethodsInputSchema) ]).optional(),
}).strict();

export const ShopCreateNestedOneWithoutShopEventsInputSchema: z.ZodType<Prisma.ShopCreateNestedOneWithoutShopEventsInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutShopEventsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutShopEventsInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional()
}).strict();

export const EventCreateNestedOneWithoutShopEventsInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutShopEventsInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutShopEventsInputSchema),z.lazy(() => EventUncheckedCreateWithoutShopEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutShopEventsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const ShopUpdateOneRequiredWithoutShopEventsNestedInputSchema: z.ZodType<Prisma.ShopUpdateOneRequiredWithoutShopEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutShopEventsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutShopEventsInputSchema).optional(),
  upsert: z.lazy(() => ShopUpsertWithoutShopEventsInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShopUpdateToOneWithWhereWithoutShopEventsInputSchema),z.lazy(() => ShopUpdateWithoutShopEventsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopEventsInputSchema) ]).optional(),
}).strict();

export const EventUpdateOneRequiredWithoutShopEventsNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutShopEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutShopEventsInputSchema),z.lazy(() => EventUncheckedCreateWithoutShopEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutShopEventsInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutShopEventsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutShopEventsInputSchema),z.lazy(() => EventUpdateWithoutShopEventsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutShopEventsInputSchema) ]).optional(),
}).strict();

export const ShopCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.ShopCreateNestedOneWithoutReviewsInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutReviewsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReviewsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ShopUpdateOneRequiredWithoutReviewsNestedInputSchema: z.ZodType<Prisma.ShopUpdateOneRequiredWithoutReviewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShopCreateWithoutReviewsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShopCreateOrConnectWithoutReviewsInputSchema).optional(),
  upsert: z.lazy(() => ShopUpsertWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => ShopWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShopUpdateToOneWithWhereWithoutReviewsInputSchema),z.lazy(() => ShopUpdateWithoutReviewsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutReviewsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutReviewsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutReviewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReviewsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReviewsInputSchema),z.lazy(() => UserUpdateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyAuthorInputSchema),z.lazy(() => PostCreateManyAuthorInputSchema).array() ]),
}).strict();

export const LikeCreateWithoutUserInputSchema: z.ZodType<Prisma.LikeCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  postId: z.string()
}).strict();

export const LikeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LikeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LikeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.LikeCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LikeCreateManyUserInputSchema),z.lazy(() => LikeCreateManyUserInputSchema).array() ]),
}).strict();

export const CommentCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postId: z.string()
}).strict();

export const CommentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyUserInputSchema),z.lazy(() => CommentCreateManyUserInputSchema).array() ]),
}).strict();

export const ReviewCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  ratingTaste: z.number().optional().nullable(),
  ratingAtmosphere: z.number().optional().nullable(),
  ratingService: z.number().optional().nullable(),
  ratingValue: z.number().optional().nullable(),
  comment: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shop: z.lazy(() => ShopCreateNestedOneWithoutReviewsInputSchema)
}).strict();

export const ReviewUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  shopId: z.string(),
  ratingTaste: z.number().optional().nullable(),
  ratingAtmosphere: z.number().optional().nullable(),
  ratingService: z.number().optional().nullable(),
  ratingValue: z.number().optional().nullable(),
  comment: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReviewCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReviewCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyUserInputSchema),z.lazy(() => ReviewCreateManyUserInputSchema).array() ]),
}).strict();

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const PostScalarWhereInputSchema: z.ZodType<Prisma.PostScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const LikeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LikeUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LikeUpdateWithoutUserInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LikeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LikeUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateWithoutUserInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const LikeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LikeUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => LikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateManyMutationInputSchema),z.lazy(() => LikeUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const LikeScalarWhereInputSchema: z.ZodType<Prisma.LikeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutUserInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutUserInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ReviewUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReviewUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ReviewUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ReviewScalarWhereInputSchema: z.ZodType<Prisma.ReviewScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ratingTaste: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ratingService: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ratingValue: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tags: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const LikeCreateWithoutPostInputSchema: z.ZodType<Prisma.LikeCreateWithoutPostInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikeUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.LikeUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const LikeCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.LikeCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const LikeCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.LikeCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LikeCreateManyPostInputSchema),z.lazy(() => LikeCreateManyPostInputSchema).array() ]),
}).strict();

export const CommentCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateWithoutPostInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const CommentCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const CommentCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyPostInputSchema),z.lazy(() => CommentCreateManyPostInputSchema).array() ]),
}).strict();

export const PostTagCreateWithoutPostInputSchema: z.ZodType<Prisma.PostTagCreateWithoutPostInput> = z.object({
  id: z.string().cuid().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutPostsInputSchema)
}).strict();

export const PostTagUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.string()
}).strict();

export const PostTagCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.PostTagCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const PostTagCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.PostTagCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostTagCreateManyPostInputSchema),z.lazy(() => PostTagCreateManyPostInputSchema).array() ]),
}).strict();

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const LikeUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.LikeUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LikeUpdateWithoutPostInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const LikeUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.LikeUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateWithoutPostInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const LikeUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.LikeUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => LikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateManyMutationInputSchema),z.lazy(() => LikeUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutPostInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutPostInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const PostTagUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostTagUpdateWithoutPostInputSchema),z.lazy(() => PostTagUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => PostTagCreateWithoutPostInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const PostTagUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostTagUpdateWithoutPostInputSchema),z.lazy(() => PostTagUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const PostTagUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => PostTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostTagUpdateManyMutationInputSchema),z.lazy(() => PostTagUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const PostTagScalarWhereInputSchema: z.ZodType<Prisma.PostTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostTagScalarWhereInputSchema),z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostTagScalarWhereInputSchema),z.lazy(() => PostTagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateWithoutLikesInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const PostCreateWithoutLikesInputSchema: z.ZodType<Prisma.PostCreateWithoutLikesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutLikesInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const UserUpsertWithoutLikesInputSchema: z.ZodType<Prisma.UserUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const UserUpdateWithoutLikesInputSchema: z.ZodType<Prisma.UserUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostUpsertWithoutLikesInputSchema: z.ZodType<Prisma.PostUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutLikesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutLikesInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutLikesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const PostUpdateWithoutLikesInputSchema: z.ZodType<Prisma.PostUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const PostCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  likes: z.lazy(() => LikeCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const PostUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostTagCreateWithoutTagInputSchema: z.ZodType<Prisma.PostTagCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const PostTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  postId: z.string()
}).strict();

export const PostTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.PostTagCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const PostTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.PostTagCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostTagCreateManyTagInputSchema),z.lazy(() => PostTagCreateManyTagInputSchema).array() ]),
}).strict();

export const PostTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostTagUpdateWithoutTagInputSchema),z.lazy(() => PostTagUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => PostTagCreateWithoutTagInputSchema),z.lazy(() => PostTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const PostTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => PostTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostTagUpdateWithoutTagInputSchema),z.lazy(() => PostTagUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const PostTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => PostTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostTagUpdateManyMutationInputSchema),z.lazy(() => PostTagUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const PostCreateWithoutTagsInputSchema: z.ZodType<Prisma.PostCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  likes: z.lazy(() => LikeCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutTagsInputSchema),z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TagCreateWithoutPostsInputSchema: z.ZodType<Prisma.TagCreateWithoutPostsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const TagUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const TagCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutPostsInputSchema),z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const PostUpsertWithoutTagsInputSchema: z.ZodType<Prisma.PostUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutTagsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutTagsInputSchema),z.lazy(() => PostUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutTagsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const PostUpdateWithoutTagsInputSchema: z.ZodType<Prisma.PostUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const TagUpsertWithoutPostsInputSchema: z.ZodType<Prisma.TagUpsertWithoutPostsInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutPostsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutPostsInputSchema),z.lazy(() => TagUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutPostsInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutPostsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutPostsInputSchema) ]),
}).strict();

export const TagUpdateWithoutPostsInputSchema: z.ZodType<Prisma.TagUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopFlavorCreateWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorCreateWithoutShopInput> = z.object({
  flavor: z.lazy(() => FlavorCreateNestedOneWithoutShopFlavorsInputSchema)
}).strict();

export const ShopFlavorUncheckedCreateWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedCreateWithoutShopInput> = z.object({
  flavorId: z.string()
}).strict();

export const ShopFlavorCreateOrConnectWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorCreateOrConnectWithoutShopInput> = z.object({
  where: z.lazy(() => ShopFlavorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutShopInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ShopFlavorCreateManyShopInputEnvelopeSchema: z.ZodType<Prisma.ShopFlavorCreateManyShopInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShopFlavorCreateManyShopInputSchema),z.lazy(() => ShopFlavorCreateManyShopInputSchema).array() ]),
}).strict();

export const ShopAtmosphereCreateWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereCreateWithoutShopInput> = z.object({
  atmosphere: z.lazy(() => AtmosphereCreateNestedOneWithoutShopAtmospheresInputSchema)
}).strict();

export const ShopAtmosphereUncheckedCreateWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedCreateWithoutShopInput> = z.object({
  atmosphereId: z.string()
}).strict();

export const ShopAtmosphereCreateOrConnectWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereCreateOrConnectWithoutShopInput> = z.object({
  where: z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ShopAtmosphereCreateManyShopInputEnvelopeSchema: z.ZodType<Prisma.ShopAtmosphereCreateManyShopInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShopAtmosphereCreateManyShopInputSchema),z.lazy(() => ShopAtmosphereCreateManyShopInputSchema).array() ]),
}).strict();

export const ShopHobbyCreateWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyCreateWithoutShopInput> = z.object({
  hobby: z.lazy(() => HobbyCreateNestedOneWithoutShopHobbiesInputSchema)
}).strict();

export const ShopHobbyUncheckedCreateWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedCreateWithoutShopInput> = z.object({
  hobbyId: z.string()
}).strict();

export const ShopHobbyCreateOrConnectWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyCreateOrConnectWithoutShopInput> = z.object({
  where: z.lazy(() => ShopHobbyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutShopInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ShopHobbyCreateManyShopInputEnvelopeSchema: z.ZodType<Prisma.ShopHobbyCreateManyShopInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShopHobbyCreateManyShopInputSchema),z.lazy(() => ShopHobbyCreateManyShopInputSchema).array() ]),
}).strict();

export const ShopPaymentMethodCreateWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodCreateWithoutShopInput> = z.object({
  paymentMethod: z.lazy(() => PaymentMethodCreateNestedOneWithoutShopPaymentMethodsInputSchema)
}).strict();

export const ShopPaymentMethodUncheckedCreateWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedCreateWithoutShopInput> = z.object({
  paymentMethodId: z.string()
}).strict();

export const ShopPaymentMethodCreateOrConnectWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodCreateOrConnectWithoutShopInput> = z.object({
  where: z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ShopPaymentMethodCreateManyShopInputEnvelopeSchema: z.ZodType<Prisma.ShopPaymentMethodCreateManyShopInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShopPaymentMethodCreateManyShopInputSchema),z.lazy(() => ShopPaymentMethodCreateManyShopInputSchema).array() ]),
}).strict();

export const ShopEventCreateWithoutShopInputSchema: z.ZodType<Prisma.ShopEventCreateWithoutShopInput> = z.object({
  event: z.lazy(() => EventCreateNestedOneWithoutShopEventsInputSchema)
}).strict();

export const ShopEventUncheckedCreateWithoutShopInputSchema: z.ZodType<Prisma.ShopEventUncheckedCreateWithoutShopInput> = z.object({
  eventId: z.string()
}).strict();

export const ShopEventCreateOrConnectWithoutShopInputSchema: z.ZodType<Prisma.ShopEventCreateOrConnectWithoutShopInput> = z.object({
  where: z.lazy(() => ShopEventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopEventCreateWithoutShopInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ShopEventCreateManyShopInputEnvelopeSchema: z.ZodType<Prisma.ShopEventCreateManyShopInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShopEventCreateManyShopInputSchema),z.lazy(() => ShopEventCreateManyShopInputSchema).array() ]),
}).strict();

export const ReviewCreateWithoutShopInputSchema: z.ZodType<Prisma.ReviewCreateWithoutShopInput> = z.object({
  id: z.string().cuid().optional(),
  ratingTaste: z.number().optional().nullable(),
  ratingAtmosphere: z.number().optional().nullable(),
  ratingService: z.number().optional().nullable(),
  ratingValue: z.number().optional().nullable(),
  comment: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateWithoutShopInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutShopInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional().nullable(),
  ratingTaste: z.number().optional().nullable(),
  ratingAtmosphere: z.number().optional().nullable(),
  ratingService: z.number().optional().nullable(),
  ratingValue: z.number().optional().nullable(),
  comment: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReviewCreateOrConnectWithoutShopInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutShopInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutShopInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ReviewCreateManyShopInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyShopInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyShopInputSchema),z.lazy(() => ReviewCreateManyShopInputSchema).array() ]),
}).strict();

export const ShopFlavorUpsertWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorUpsertWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ShopFlavorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShopFlavorUpdateWithoutShopInputSchema),z.lazy(() => ShopFlavorUncheckedUpdateWithoutShopInputSchema) ]),
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutShopInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ShopFlavorUpdateWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorUpdateWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ShopFlavorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShopFlavorUpdateWithoutShopInputSchema),z.lazy(() => ShopFlavorUncheckedUpdateWithoutShopInputSchema) ]),
}).strict();

export const ShopFlavorUpdateManyWithWhereWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorUpdateManyWithWhereWithoutShopInput> = z.object({
  where: z.lazy(() => ShopFlavorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShopFlavorUpdateManyMutationInputSchema),z.lazy(() => ShopFlavorUncheckedUpdateManyWithoutShopInputSchema) ]),
}).strict();

export const ShopFlavorScalarWhereInputSchema: z.ZodType<Prisma.ShopFlavorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopFlavorScalarWhereInputSchema),z.lazy(() => ShopFlavorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopFlavorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopFlavorScalarWhereInputSchema),z.lazy(() => ShopFlavorScalarWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  flavorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ShopAtmosphereUpsertWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereUpsertWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShopAtmosphereUpdateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUncheckedUpdateWithoutShopInputSchema) ]),
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ShopAtmosphereUpdateWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereUpdateWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShopAtmosphereUpdateWithoutShopInputSchema),z.lazy(() => ShopAtmosphereUncheckedUpdateWithoutShopInputSchema) ]),
}).strict();

export const ShopAtmosphereUpdateManyWithWhereWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereUpdateManyWithWhereWithoutShopInput> = z.object({
  where: z.lazy(() => ShopAtmosphereScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShopAtmosphereUpdateManyMutationInputSchema),z.lazy(() => ShopAtmosphereUncheckedUpdateManyWithoutShopInputSchema) ]),
}).strict();

export const ShopAtmosphereScalarWhereInputSchema: z.ZodType<Prisma.ShopAtmosphereScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopAtmosphereScalarWhereInputSchema),z.lazy(() => ShopAtmosphereScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopAtmosphereScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopAtmosphereScalarWhereInputSchema),z.lazy(() => ShopAtmosphereScalarWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  atmosphereId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ShopHobbyUpsertWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyUpsertWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ShopHobbyWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShopHobbyUpdateWithoutShopInputSchema),z.lazy(() => ShopHobbyUncheckedUpdateWithoutShopInputSchema) ]),
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutShopInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ShopHobbyUpdateWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyUpdateWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ShopHobbyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShopHobbyUpdateWithoutShopInputSchema),z.lazy(() => ShopHobbyUncheckedUpdateWithoutShopInputSchema) ]),
}).strict();

export const ShopHobbyUpdateManyWithWhereWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyUpdateManyWithWhereWithoutShopInput> = z.object({
  where: z.lazy(() => ShopHobbyScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShopHobbyUpdateManyMutationInputSchema),z.lazy(() => ShopHobbyUncheckedUpdateManyWithoutShopInputSchema) ]),
}).strict();

export const ShopHobbyScalarWhereInputSchema: z.ZodType<Prisma.ShopHobbyScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopHobbyScalarWhereInputSchema),z.lazy(() => ShopHobbyScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopHobbyScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopHobbyScalarWhereInputSchema),z.lazy(() => ShopHobbyScalarWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hobbyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ShopPaymentMethodUpsertWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpsertWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShopPaymentMethodUpdateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUncheckedUpdateWithoutShopInputSchema) ]),
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ShopPaymentMethodUpdateWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShopPaymentMethodUpdateWithoutShopInputSchema),z.lazy(() => ShopPaymentMethodUncheckedUpdateWithoutShopInputSchema) ]),
}).strict();

export const ShopPaymentMethodUpdateManyWithWhereWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateManyWithWhereWithoutShopInput> = z.object({
  where: z.lazy(() => ShopPaymentMethodScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShopPaymentMethodUpdateManyMutationInputSchema),z.lazy(() => ShopPaymentMethodUncheckedUpdateManyWithoutShopInputSchema) ]),
}).strict();

export const ShopPaymentMethodScalarWhereInputSchema: z.ZodType<Prisma.ShopPaymentMethodScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopPaymentMethodScalarWhereInputSchema),z.lazy(() => ShopPaymentMethodScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopPaymentMethodScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopPaymentMethodScalarWhereInputSchema),z.lazy(() => ShopPaymentMethodScalarWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  paymentMethodId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ShopEventUpsertWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ShopEventUpsertWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ShopEventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShopEventUpdateWithoutShopInputSchema),z.lazy(() => ShopEventUncheckedUpdateWithoutShopInputSchema) ]),
  create: z.union([ z.lazy(() => ShopEventCreateWithoutShopInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ShopEventUpdateWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ShopEventUpdateWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ShopEventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShopEventUpdateWithoutShopInputSchema),z.lazy(() => ShopEventUncheckedUpdateWithoutShopInputSchema) ]),
}).strict();

export const ShopEventUpdateManyWithWhereWithoutShopInputSchema: z.ZodType<Prisma.ShopEventUpdateManyWithWhereWithoutShopInput> = z.object({
  where: z.lazy(() => ShopEventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShopEventUpdateManyMutationInputSchema),z.lazy(() => ShopEventUncheckedUpdateManyWithoutShopInputSchema) ]),
}).strict();

export const ShopEventScalarWhereInputSchema: z.ZodType<Prisma.ShopEventScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShopEventScalarWhereInputSchema),z.lazy(() => ShopEventScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShopEventScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShopEventScalarWhereInputSchema),z.lazy(() => ShopEventScalarWhereInputSchema).array() ]).optional(),
  shopId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ReviewUpsertWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutShopInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutShopInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutShopInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutShopInputSchema) ]),
}).strict();

export const ReviewUpdateWithWhereUniqueWithoutShopInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutShopInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutShopInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutShopInputSchema) ]),
}).strict();

export const ReviewUpdateManyWithWhereWithoutShopInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutShopInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutShopInputSchema) ]),
}).strict();

export const ShopFlavorCreateWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorCreateWithoutFlavorInput> = z.object({
  shop: z.lazy(() => ShopCreateNestedOneWithoutShopFlavorsInputSchema)
}).strict();

export const ShopFlavorUncheckedCreateWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedCreateWithoutFlavorInput> = z.object({
  shopId: z.string()
}).strict();

export const ShopFlavorCreateOrConnectWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorCreateOrConnectWithoutFlavorInput> = z.object({
  where: z.lazy(() => ShopFlavorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutFlavorInputSchema) ]),
}).strict();

export const ShopFlavorCreateManyFlavorInputEnvelopeSchema: z.ZodType<Prisma.ShopFlavorCreateManyFlavorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShopFlavorCreateManyFlavorInputSchema),z.lazy(() => ShopFlavorCreateManyFlavorInputSchema).array() ]),
}).strict();

export const ShopFlavorUpsertWithWhereUniqueWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorUpsertWithWhereUniqueWithoutFlavorInput> = z.object({
  where: z.lazy(() => ShopFlavorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShopFlavorUpdateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUncheckedUpdateWithoutFlavorInputSchema) ]),
  create: z.union([ z.lazy(() => ShopFlavorCreateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUncheckedCreateWithoutFlavorInputSchema) ]),
}).strict();

export const ShopFlavorUpdateWithWhereUniqueWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorUpdateWithWhereUniqueWithoutFlavorInput> = z.object({
  where: z.lazy(() => ShopFlavorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShopFlavorUpdateWithoutFlavorInputSchema),z.lazy(() => ShopFlavorUncheckedUpdateWithoutFlavorInputSchema) ]),
}).strict();

export const ShopFlavorUpdateManyWithWhereWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorUpdateManyWithWhereWithoutFlavorInput> = z.object({
  where: z.lazy(() => ShopFlavorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShopFlavorUpdateManyMutationInputSchema),z.lazy(() => ShopFlavorUncheckedUpdateManyWithoutFlavorInputSchema) ]),
}).strict();

export const ShopAtmosphereCreateWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereCreateWithoutAtmosphereInput> = z.object({
  shop: z.lazy(() => ShopCreateNestedOneWithoutShopAtmospheresInputSchema)
}).strict();

export const ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedCreateWithoutAtmosphereInput> = z.object({
  shopId: z.string()
}).strict();

export const ShopAtmosphereCreateOrConnectWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereCreateOrConnectWithoutAtmosphereInput> = z.object({
  where: z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema) ]),
}).strict();

export const ShopAtmosphereCreateManyAtmosphereInputEnvelopeSchema: z.ZodType<Prisma.ShopAtmosphereCreateManyAtmosphereInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShopAtmosphereCreateManyAtmosphereInputSchema),z.lazy(() => ShopAtmosphereCreateManyAtmosphereInputSchema).array() ]),
}).strict();

export const ShopAtmosphereUpsertWithWhereUniqueWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereUpsertWithWhereUniqueWithoutAtmosphereInput> = z.object({
  where: z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShopAtmosphereUpdateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUncheckedUpdateWithoutAtmosphereInputSchema) ]),
  create: z.union([ z.lazy(() => ShopAtmosphereCreateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUncheckedCreateWithoutAtmosphereInputSchema) ]),
}).strict();

export const ShopAtmosphereUpdateWithWhereUniqueWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereUpdateWithWhereUniqueWithoutAtmosphereInput> = z.object({
  where: z.lazy(() => ShopAtmosphereWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShopAtmosphereUpdateWithoutAtmosphereInputSchema),z.lazy(() => ShopAtmosphereUncheckedUpdateWithoutAtmosphereInputSchema) ]),
}).strict();

export const ShopAtmosphereUpdateManyWithWhereWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereUpdateManyWithWhereWithoutAtmosphereInput> = z.object({
  where: z.lazy(() => ShopAtmosphereScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShopAtmosphereUpdateManyMutationInputSchema),z.lazy(() => ShopAtmosphereUncheckedUpdateManyWithoutAtmosphereInputSchema) ]),
}).strict();

export const ShopHobbyCreateWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyCreateWithoutHobbyInput> = z.object({
  shop: z.lazy(() => ShopCreateNestedOneWithoutShopHobbiesInputSchema)
}).strict();

export const ShopHobbyUncheckedCreateWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedCreateWithoutHobbyInput> = z.object({
  shopId: z.string()
}).strict();

export const ShopHobbyCreateOrConnectWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyCreateOrConnectWithoutHobbyInput> = z.object({
  where: z.lazy(() => ShopHobbyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutHobbyInputSchema) ]),
}).strict();

export const ShopHobbyCreateManyHobbyInputEnvelopeSchema: z.ZodType<Prisma.ShopHobbyCreateManyHobbyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShopHobbyCreateManyHobbyInputSchema),z.lazy(() => ShopHobbyCreateManyHobbyInputSchema).array() ]),
}).strict();

export const ShopHobbyUpsertWithWhereUniqueWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyUpsertWithWhereUniqueWithoutHobbyInput> = z.object({
  where: z.lazy(() => ShopHobbyWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShopHobbyUpdateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUncheckedUpdateWithoutHobbyInputSchema) ]),
  create: z.union([ z.lazy(() => ShopHobbyCreateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUncheckedCreateWithoutHobbyInputSchema) ]),
}).strict();

export const ShopHobbyUpdateWithWhereUniqueWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyUpdateWithWhereUniqueWithoutHobbyInput> = z.object({
  where: z.lazy(() => ShopHobbyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShopHobbyUpdateWithoutHobbyInputSchema),z.lazy(() => ShopHobbyUncheckedUpdateWithoutHobbyInputSchema) ]),
}).strict();

export const ShopHobbyUpdateManyWithWhereWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyUpdateManyWithWhereWithoutHobbyInput> = z.object({
  where: z.lazy(() => ShopHobbyScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShopHobbyUpdateManyMutationInputSchema),z.lazy(() => ShopHobbyUncheckedUpdateManyWithoutHobbyInputSchema) ]),
}).strict();

export const ShopPaymentMethodCreateWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodCreateWithoutPaymentMethodInput> = z.object({
  shop: z.lazy(() => ShopCreateNestedOneWithoutShopPaymentMethodsInputSchema)
}).strict();

export const ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInput> = z.object({
  shopId: z.string()
}).strict();

export const ShopPaymentMethodCreateOrConnectWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodCreateOrConnectWithoutPaymentMethodInput> = z.object({
  where: z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema) ]),
}).strict();

export const ShopPaymentMethodCreateManyPaymentMethodInputEnvelopeSchema: z.ZodType<Prisma.ShopPaymentMethodCreateManyPaymentMethodInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShopPaymentMethodCreateManyPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodCreateManyPaymentMethodInputSchema).array() ]),
}).strict();

export const ShopPaymentMethodUpsertWithWhereUniqueWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpsertWithWhereUniqueWithoutPaymentMethodInput> = z.object({
  where: z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShopPaymentMethodUpdateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUncheckedUpdateWithoutPaymentMethodInputSchema) ]),
  create: z.union([ z.lazy(() => ShopPaymentMethodCreateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUncheckedCreateWithoutPaymentMethodInputSchema) ]),
}).strict();

export const ShopPaymentMethodUpdateWithWhereUniqueWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateWithWhereUniqueWithoutPaymentMethodInput> = z.object({
  where: z.lazy(() => ShopPaymentMethodWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShopPaymentMethodUpdateWithoutPaymentMethodInputSchema),z.lazy(() => ShopPaymentMethodUncheckedUpdateWithoutPaymentMethodInputSchema) ]),
}).strict();

export const ShopPaymentMethodUpdateManyWithWhereWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateManyWithWhereWithoutPaymentMethodInput> = z.object({
  where: z.lazy(() => ShopPaymentMethodScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShopPaymentMethodUpdateManyMutationInputSchema),z.lazy(() => ShopPaymentMethodUncheckedUpdateManyWithoutPaymentMethodInputSchema) ]),
}).strict();

export const ShopEventCreateWithoutEventInputSchema: z.ZodType<Prisma.ShopEventCreateWithoutEventInput> = z.object({
  shop: z.lazy(() => ShopCreateNestedOneWithoutShopEventsInputSchema)
}).strict();

export const ShopEventUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.ShopEventUncheckedCreateWithoutEventInput> = z.object({
  shopId: z.string()
}).strict();

export const ShopEventCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.ShopEventCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => ShopEventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopEventCreateWithoutEventInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const ShopEventCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.ShopEventCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ShopEventCreateManyEventInputSchema),z.lazy(() => ShopEventCreateManyEventInputSchema).array() ]),
}).strict();

export const ShopEventUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.ShopEventUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => ShopEventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ShopEventUpdateWithoutEventInputSchema),z.lazy(() => ShopEventUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => ShopEventCreateWithoutEventInputSchema),z.lazy(() => ShopEventUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const ShopEventUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.ShopEventUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => ShopEventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ShopEventUpdateWithoutEventInputSchema),z.lazy(() => ShopEventUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const ShopEventUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.ShopEventUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => ShopEventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ShopEventUpdateManyMutationInputSchema),z.lazy(() => ShopEventUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const ShopCreateWithoutShopFlavorsInputSchema: z.ZodType<Prisma.ShopCreateWithoutShopFlavorsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopUncheckedCreateWithoutShopFlavorsInputSchema: z.ZodType<Prisma.ShopUncheckedCreateWithoutShopFlavorsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopCreateOrConnectWithoutShopFlavorsInputSchema: z.ZodType<Prisma.ShopCreateOrConnectWithoutShopFlavorsInput> = z.object({
  where: z.lazy(() => ShopWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopCreateWithoutShopFlavorsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopFlavorsInputSchema) ]),
}).strict();

export const FlavorCreateWithoutShopFlavorsInputSchema: z.ZodType<Prisma.FlavorCreateWithoutShopFlavorsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const FlavorUncheckedCreateWithoutShopFlavorsInputSchema: z.ZodType<Prisma.FlavorUncheckedCreateWithoutShopFlavorsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const FlavorCreateOrConnectWithoutShopFlavorsInputSchema: z.ZodType<Prisma.FlavorCreateOrConnectWithoutShopFlavorsInput> = z.object({
  where: z.lazy(() => FlavorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FlavorCreateWithoutShopFlavorsInputSchema),z.lazy(() => FlavorUncheckedCreateWithoutShopFlavorsInputSchema) ]),
}).strict();

export const ShopUpsertWithoutShopFlavorsInputSchema: z.ZodType<Prisma.ShopUpsertWithoutShopFlavorsInput> = z.object({
  update: z.union([ z.lazy(() => ShopUpdateWithoutShopFlavorsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopFlavorsInputSchema) ]),
  create: z.union([ z.lazy(() => ShopCreateWithoutShopFlavorsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopFlavorsInputSchema) ]),
  where: z.lazy(() => ShopWhereInputSchema).optional()
}).strict();

export const ShopUpdateToOneWithWhereWithoutShopFlavorsInputSchema: z.ZodType<Prisma.ShopUpdateToOneWithWhereWithoutShopFlavorsInput> = z.object({
  where: z.lazy(() => ShopWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShopUpdateWithoutShopFlavorsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopFlavorsInputSchema) ]),
}).strict();

export const ShopUpdateWithoutShopFlavorsInputSchema: z.ZodType<Prisma.ShopUpdateWithoutShopFlavorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const ShopUncheckedUpdateWithoutShopFlavorsInputSchema: z.ZodType<Prisma.ShopUncheckedUpdateWithoutShopFlavorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const FlavorUpsertWithoutShopFlavorsInputSchema: z.ZodType<Prisma.FlavorUpsertWithoutShopFlavorsInput> = z.object({
  update: z.union([ z.lazy(() => FlavorUpdateWithoutShopFlavorsInputSchema),z.lazy(() => FlavorUncheckedUpdateWithoutShopFlavorsInputSchema) ]),
  create: z.union([ z.lazy(() => FlavorCreateWithoutShopFlavorsInputSchema),z.lazy(() => FlavorUncheckedCreateWithoutShopFlavorsInputSchema) ]),
  where: z.lazy(() => FlavorWhereInputSchema).optional()
}).strict();

export const FlavorUpdateToOneWithWhereWithoutShopFlavorsInputSchema: z.ZodType<Prisma.FlavorUpdateToOneWithWhereWithoutShopFlavorsInput> = z.object({
  where: z.lazy(() => FlavorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FlavorUpdateWithoutShopFlavorsInputSchema),z.lazy(() => FlavorUncheckedUpdateWithoutShopFlavorsInputSchema) ]),
}).strict();

export const FlavorUpdateWithoutShopFlavorsInputSchema: z.ZodType<Prisma.FlavorUpdateWithoutShopFlavorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FlavorUncheckedUpdateWithoutShopFlavorsInputSchema: z.ZodType<Prisma.FlavorUncheckedUpdateWithoutShopFlavorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopCreateWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.ShopCreateWithoutShopAtmospheresInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopUncheckedCreateWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.ShopUncheckedCreateWithoutShopAtmospheresInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopCreateOrConnectWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.ShopCreateOrConnectWithoutShopAtmospheresInput> = z.object({
  where: z.lazy(() => ShopWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopCreateWithoutShopAtmospheresInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopAtmospheresInputSchema) ]),
}).strict();

export const AtmosphereCreateWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.AtmosphereCreateWithoutShopAtmospheresInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const AtmosphereUncheckedCreateWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.AtmosphereUncheckedCreateWithoutShopAtmospheresInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const AtmosphereCreateOrConnectWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.AtmosphereCreateOrConnectWithoutShopAtmospheresInput> = z.object({
  where: z.lazy(() => AtmosphereWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AtmosphereCreateWithoutShopAtmospheresInputSchema),z.lazy(() => AtmosphereUncheckedCreateWithoutShopAtmospheresInputSchema) ]),
}).strict();

export const ShopUpsertWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.ShopUpsertWithoutShopAtmospheresInput> = z.object({
  update: z.union([ z.lazy(() => ShopUpdateWithoutShopAtmospheresInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopAtmospheresInputSchema) ]),
  create: z.union([ z.lazy(() => ShopCreateWithoutShopAtmospheresInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopAtmospheresInputSchema) ]),
  where: z.lazy(() => ShopWhereInputSchema).optional()
}).strict();

export const ShopUpdateToOneWithWhereWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.ShopUpdateToOneWithWhereWithoutShopAtmospheresInput> = z.object({
  where: z.lazy(() => ShopWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShopUpdateWithoutShopAtmospheresInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopAtmospheresInputSchema) ]),
}).strict();

export const ShopUpdateWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.ShopUpdateWithoutShopAtmospheresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const ShopUncheckedUpdateWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.ShopUncheckedUpdateWithoutShopAtmospheresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const AtmosphereUpsertWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.AtmosphereUpsertWithoutShopAtmospheresInput> = z.object({
  update: z.union([ z.lazy(() => AtmosphereUpdateWithoutShopAtmospheresInputSchema),z.lazy(() => AtmosphereUncheckedUpdateWithoutShopAtmospheresInputSchema) ]),
  create: z.union([ z.lazy(() => AtmosphereCreateWithoutShopAtmospheresInputSchema),z.lazy(() => AtmosphereUncheckedCreateWithoutShopAtmospheresInputSchema) ]),
  where: z.lazy(() => AtmosphereWhereInputSchema).optional()
}).strict();

export const AtmosphereUpdateToOneWithWhereWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.AtmosphereUpdateToOneWithWhereWithoutShopAtmospheresInput> = z.object({
  where: z.lazy(() => AtmosphereWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AtmosphereUpdateWithoutShopAtmospheresInputSchema),z.lazy(() => AtmosphereUncheckedUpdateWithoutShopAtmospheresInputSchema) ]),
}).strict();

export const AtmosphereUpdateWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.AtmosphereUpdateWithoutShopAtmospheresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AtmosphereUncheckedUpdateWithoutShopAtmospheresInputSchema: z.ZodType<Prisma.AtmosphereUncheckedUpdateWithoutShopAtmospheresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopCreateWithoutShopHobbiesInputSchema: z.ZodType<Prisma.ShopCreateWithoutShopHobbiesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorCreateNestedManyWithoutShopInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopUncheckedCreateWithoutShopHobbiesInputSchema: z.ZodType<Prisma.ShopUncheckedCreateWithoutShopHobbiesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopCreateOrConnectWithoutShopHobbiesInputSchema: z.ZodType<Prisma.ShopCreateOrConnectWithoutShopHobbiesInput> = z.object({
  where: z.lazy(() => ShopWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopCreateWithoutShopHobbiesInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopHobbiesInputSchema) ]),
}).strict();

export const HobbyCreateWithoutShopHobbiesInputSchema: z.ZodType<Prisma.HobbyCreateWithoutShopHobbiesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const HobbyUncheckedCreateWithoutShopHobbiesInputSchema: z.ZodType<Prisma.HobbyUncheckedCreateWithoutShopHobbiesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const HobbyCreateOrConnectWithoutShopHobbiesInputSchema: z.ZodType<Prisma.HobbyCreateOrConnectWithoutShopHobbiesInput> = z.object({
  where: z.lazy(() => HobbyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HobbyCreateWithoutShopHobbiesInputSchema),z.lazy(() => HobbyUncheckedCreateWithoutShopHobbiesInputSchema) ]),
}).strict();

export const ShopUpsertWithoutShopHobbiesInputSchema: z.ZodType<Prisma.ShopUpsertWithoutShopHobbiesInput> = z.object({
  update: z.union([ z.lazy(() => ShopUpdateWithoutShopHobbiesInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopHobbiesInputSchema) ]),
  create: z.union([ z.lazy(() => ShopCreateWithoutShopHobbiesInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopHobbiesInputSchema) ]),
  where: z.lazy(() => ShopWhereInputSchema).optional()
}).strict();

export const ShopUpdateToOneWithWhereWithoutShopHobbiesInputSchema: z.ZodType<Prisma.ShopUpdateToOneWithWhereWithoutShopHobbiesInput> = z.object({
  where: z.lazy(() => ShopWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShopUpdateWithoutShopHobbiesInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopHobbiesInputSchema) ]),
}).strict();

export const ShopUpdateWithoutShopHobbiesInputSchema: z.ZodType<Prisma.ShopUpdateWithoutShopHobbiesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUpdateManyWithoutShopNestedInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const ShopUncheckedUpdateWithoutShopHobbiesInputSchema: z.ZodType<Prisma.ShopUncheckedUpdateWithoutShopHobbiesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const HobbyUpsertWithoutShopHobbiesInputSchema: z.ZodType<Prisma.HobbyUpsertWithoutShopHobbiesInput> = z.object({
  update: z.union([ z.lazy(() => HobbyUpdateWithoutShopHobbiesInputSchema),z.lazy(() => HobbyUncheckedUpdateWithoutShopHobbiesInputSchema) ]),
  create: z.union([ z.lazy(() => HobbyCreateWithoutShopHobbiesInputSchema),z.lazy(() => HobbyUncheckedCreateWithoutShopHobbiesInputSchema) ]),
  where: z.lazy(() => HobbyWhereInputSchema).optional()
}).strict();

export const HobbyUpdateToOneWithWhereWithoutShopHobbiesInputSchema: z.ZodType<Prisma.HobbyUpdateToOneWithWhereWithoutShopHobbiesInput> = z.object({
  where: z.lazy(() => HobbyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => HobbyUpdateWithoutShopHobbiesInputSchema),z.lazy(() => HobbyUncheckedUpdateWithoutShopHobbiesInputSchema) ]),
}).strict();

export const HobbyUpdateWithoutShopHobbiesInputSchema: z.ZodType<Prisma.HobbyUpdateWithoutShopHobbiesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HobbyUncheckedUpdateWithoutShopHobbiesInputSchema: z.ZodType<Prisma.HobbyUncheckedUpdateWithoutShopHobbiesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopCreateWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.ShopCreateWithoutShopPaymentMethodsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorCreateNestedManyWithoutShopInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopUncheckedCreateWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.ShopUncheckedCreateWithoutShopPaymentMethodsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopCreateOrConnectWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.ShopCreateOrConnectWithoutShopPaymentMethodsInput> = z.object({
  where: z.lazy(() => ShopWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopCreateWithoutShopPaymentMethodsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopPaymentMethodsInputSchema) ]),
}).strict();

export const PaymentMethodCreateWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.PaymentMethodCreateWithoutShopPaymentMethodsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const PaymentMethodUncheckedCreateWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedCreateWithoutShopPaymentMethodsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const PaymentMethodCreateOrConnectWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.PaymentMethodCreateOrConnectWithoutShopPaymentMethodsInput> = z.object({
  where: z.lazy(() => PaymentMethodWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PaymentMethodCreateWithoutShopPaymentMethodsInputSchema),z.lazy(() => PaymentMethodUncheckedCreateWithoutShopPaymentMethodsInputSchema) ]),
}).strict();

export const ShopUpsertWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.ShopUpsertWithoutShopPaymentMethodsInput> = z.object({
  update: z.union([ z.lazy(() => ShopUpdateWithoutShopPaymentMethodsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopPaymentMethodsInputSchema) ]),
  create: z.union([ z.lazy(() => ShopCreateWithoutShopPaymentMethodsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopPaymentMethodsInputSchema) ]),
  where: z.lazy(() => ShopWhereInputSchema).optional()
}).strict();

export const ShopUpdateToOneWithWhereWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.ShopUpdateToOneWithWhereWithoutShopPaymentMethodsInput> = z.object({
  where: z.lazy(() => ShopWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShopUpdateWithoutShopPaymentMethodsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopPaymentMethodsInputSchema) ]),
}).strict();

export const ShopUpdateWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.ShopUpdateWithoutShopPaymentMethodsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUpdateManyWithoutShopNestedInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const ShopUncheckedUpdateWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.ShopUncheckedUpdateWithoutShopPaymentMethodsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const PaymentMethodUpsertWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.PaymentMethodUpsertWithoutShopPaymentMethodsInput> = z.object({
  update: z.union([ z.lazy(() => PaymentMethodUpdateWithoutShopPaymentMethodsInputSchema),z.lazy(() => PaymentMethodUncheckedUpdateWithoutShopPaymentMethodsInputSchema) ]),
  create: z.union([ z.lazy(() => PaymentMethodCreateWithoutShopPaymentMethodsInputSchema),z.lazy(() => PaymentMethodUncheckedCreateWithoutShopPaymentMethodsInputSchema) ]),
  where: z.lazy(() => PaymentMethodWhereInputSchema).optional()
}).strict();

export const PaymentMethodUpdateToOneWithWhereWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.PaymentMethodUpdateToOneWithWhereWithoutShopPaymentMethodsInput> = z.object({
  where: z.lazy(() => PaymentMethodWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PaymentMethodUpdateWithoutShopPaymentMethodsInputSchema),z.lazy(() => PaymentMethodUncheckedUpdateWithoutShopPaymentMethodsInputSchema) ]),
}).strict();

export const PaymentMethodUpdateWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.PaymentMethodUpdateWithoutShopPaymentMethodsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentMethodUncheckedUpdateWithoutShopPaymentMethodsInputSchema: z.ZodType<Prisma.PaymentMethodUncheckedUpdateWithoutShopPaymentMethodsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopCreateWithoutShopEventsInputSchema: z.ZodType<Prisma.ShopCreateWithoutShopEventsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorCreateNestedManyWithoutShopInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopUncheckedCreateWithoutShopEventsInputSchema: z.ZodType<Prisma.ShopUncheckedCreateWithoutShopEventsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopCreateOrConnectWithoutShopEventsInputSchema: z.ZodType<Prisma.ShopCreateOrConnectWithoutShopEventsInput> = z.object({
  where: z.lazy(() => ShopWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopCreateWithoutShopEventsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopEventsInputSchema) ]),
}).strict();

export const EventCreateWithoutShopEventsInputSchema: z.ZodType<Prisma.EventCreateWithoutShopEventsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  schedule: z.string().optional().nullable()
}).strict();

export const EventUncheckedCreateWithoutShopEventsInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutShopEventsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  schedule: z.string().optional().nullable()
}).strict();

export const EventCreateOrConnectWithoutShopEventsInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutShopEventsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutShopEventsInputSchema),z.lazy(() => EventUncheckedCreateWithoutShopEventsInputSchema) ]),
}).strict();

export const ShopUpsertWithoutShopEventsInputSchema: z.ZodType<Prisma.ShopUpsertWithoutShopEventsInput> = z.object({
  update: z.union([ z.lazy(() => ShopUpdateWithoutShopEventsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopEventsInputSchema) ]),
  create: z.union([ z.lazy(() => ShopCreateWithoutShopEventsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutShopEventsInputSchema) ]),
  where: z.lazy(() => ShopWhereInputSchema).optional()
}).strict();

export const ShopUpdateToOneWithWhereWithoutShopEventsInputSchema: z.ZodType<Prisma.ShopUpdateToOneWithWhereWithoutShopEventsInput> = z.object({
  where: z.lazy(() => ShopWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShopUpdateWithoutShopEventsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutShopEventsInputSchema) ]),
}).strict();

export const ShopUpdateWithoutShopEventsInputSchema: z.ZodType<Prisma.ShopUpdateWithoutShopEventsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUpdateManyWithoutShopNestedInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const ShopUncheckedUpdateWithoutShopEventsInputSchema: z.ZodType<Prisma.ShopUncheckedUpdateWithoutShopEventsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const EventUpsertWithoutShopEventsInputSchema: z.ZodType<Prisma.EventUpsertWithoutShopEventsInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutShopEventsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutShopEventsInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutShopEventsInputSchema),z.lazy(() => EventUncheckedCreateWithoutShopEventsInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutShopEventsInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutShopEventsInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutShopEventsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutShopEventsInputSchema) ]),
}).strict();

export const EventUpdateWithoutShopEventsInputSchema: z.ZodType<Prisma.EventUpdateWithoutShopEventsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schedule: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventUncheckedUpdateWithoutShopEventsInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutShopEventsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schedule: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ShopCreateWithoutReviewsInputSchema: z.ZodType<Prisma.ShopCreateWithoutReviewsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorCreateNestedManyWithoutShopInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.ShopUncheckedCreateWithoutReviewsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  address: z.string(),
  nearestStation: z.string().optional().nullable(),
  stationWalkTime: z.number().int().optional().nullable(),
  openingHours: z.string().optional().nullable(),
  holidays: z.string().optional().nullable(),
  budgetMin: z.number().int().optional().nullable(),
  budgetMax: z.number().int().optional().nullable(),
  seatingCount: z.number().int().optional().nullable(),
  seatingTypes: z.string().optional().nullable(),
  reservation: z.string().optional().nullable(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z.string().optional().nullable(),
  parkingInfo: z.string().optional().nullable(),
  timeLimit: z.string().optional().nullable(),
  hookahBrand: z.string().optional().nullable(),
  flavorCount: z.number().int().optional().nullable(),
  photos: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  googleMapUrl: z.string().optional().nullable(),
  snsLinks: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedCreateNestedManyWithoutShopInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedCreateNestedManyWithoutShopInputSchema).optional()
}).strict();

export const ShopCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.ShopCreateOrConnectWithoutReviewsInput> = z.object({
  where: z.lazy(() => ShopWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShopCreateWithoutReviewsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutReviewsInputSchema) ]),
}).strict();

export const UserCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateWithoutReviewsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReviewsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReviewsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]),
}).strict();

export const ShopUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.ShopUpsertWithoutReviewsInput> = z.object({
  update: z.union([ z.lazy(() => ShopUpdateWithoutReviewsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutReviewsInputSchema) ]),
  create: z.union([ z.lazy(() => ShopCreateWithoutReviewsInputSchema),z.lazy(() => ShopUncheckedCreateWithoutReviewsInputSchema) ]),
  where: z.lazy(() => ShopWhereInputSchema).optional()
}).strict();

export const ShopUpdateToOneWithWhereWithoutReviewsInputSchema: z.ZodType<Prisma.ShopUpdateToOneWithWhereWithoutReviewsInput> = z.object({
  where: z.lazy(() => ShopWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShopUpdateWithoutReviewsInputSchema),z.lazy(() => ShopUncheckedUpdateWithoutReviewsInputSchema) ]),
}).strict();

export const ShopUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.ShopUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUpdateManyWithoutShopNestedInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const ShopUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.ShopUncheckedUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nearestStation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stationWalkTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  openingHours: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  holidays: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMin: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  budgetMax: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  seatingTypes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  privateBooking: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  wifi: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  powerOutlet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  smokingPolicy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parkingInfo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timeLimit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hookahBrand: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flavorCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  websiteUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleMapUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  snsLinks: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shopFlavors: z.lazy(() => ShopFlavorUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopAtmospheres: z.lazy(() => ShopAtmosphereUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopHobbies: z.lazy(() => ShopHobbyUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopPaymentMethods: z.lazy(() => ShopPaymentMethodUncheckedUpdateManyWithoutShopNestedInputSchema).optional(),
  shopEvents: z.lazy(() => ShopEventUncheckedUpdateManyWithoutShopNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReviewsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReviewsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]),
}).strict();

export const UserUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostCreateManyAuthorInputSchema: z.ZodType<Prisma.PostCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LikeCreateManyUserInputSchema: z.ZodType<Prisma.LikeCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  postId: z.string()
}).strict();

export const CommentCreateManyUserInputSchema: z.ZodType<Prisma.CommentCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postId: z.string()
}).strict();

export const ReviewCreateManyUserInputSchema: z.ZodType<Prisma.ReviewCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  shopId: z.string(),
  ratingTaste: z.number().optional().nullable(),
  ratingAtmosphere: z.number().optional().nullable(),
  ratingService: z.number().optional().nullable(),
  ratingValue: z.number().optional().nullable(),
  comment: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  tags: z.lazy(() => PostTagUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUpdateWithoutUserInputSchema: z.ZodType<Prisma.LikeUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingTaste: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingService: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingValue: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutReviewsNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingTaste: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingService: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingValue: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingTaste: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingService: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingValue: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeCreateManyPostInputSchema: z.ZodType<Prisma.LikeCreateManyPostInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const CommentCreateManyPostInputSchema: z.ZodType<Prisma.CommentCreateManyPostInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const PostTagCreateManyPostInputSchema: z.ZodType<Prisma.PostTagCreateManyPostInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.string()
}).strict();

export const LikeUpdateWithoutPostInputSchema: z.ZodType<Prisma.LikeUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikeUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostTagUpdateWithoutPostInputSchema: z.ZodType<Prisma.PostTagUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostTagUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostTagUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostTagCreateManyTagInputSchema: z.ZodType<Prisma.PostTagCreateManyTagInput> = z.object({
  id: z.string().cuid().optional(),
  postId: z.string()
}).strict();

export const PostTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.PostTagUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const PostTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.PostTagUncheckedUpdateManyWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopFlavorCreateManyShopInputSchema: z.ZodType<Prisma.ShopFlavorCreateManyShopInput> = z.object({
  flavorId: z.string()
}).strict();

export const ShopAtmosphereCreateManyShopInputSchema: z.ZodType<Prisma.ShopAtmosphereCreateManyShopInput> = z.object({
  atmosphereId: z.string()
}).strict();

export const ShopHobbyCreateManyShopInputSchema: z.ZodType<Prisma.ShopHobbyCreateManyShopInput> = z.object({
  hobbyId: z.string()
}).strict();

export const ShopPaymentMethodCreateManyShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodCreateManyShopInput> = z.object({
  paymentMethodId: z.string()
}).strict();

export const ShopEventCreateManyShopInputSchema: z.ZodType<Prisma.ShopEventCreateManyShopInput> = z.object({
  eventId: z.string()
}).strict();

export const ReviewCreateManyShopInputSchema: z.ZodType<Prisma.ReviewCreateManyShopInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional().nullable(),
  ratingTaste: z.number().optional().nullable(),
  ratingAtmosphere: z.number().optional().nullable(),
  ratingService: z.number().optional().nullable(),
  ratingValue: z.number().optional().nullable(),
  comment: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ShopFlavorUpdateWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorUpdateWithoutShopInput> = z.object({
  flavor: z.lazy(() => FlavorUpdateOneRequiredWithoutShopFlavorsNestedInputSchema).optional()
}).strict();

export const ShopFlavorUncheckedUpdateWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedUpdateWithoutShopInput> = z.object({
  flavorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopFlavorUncheckedUpdateManyWithoutShopInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedUpdateManyWithoutShopInput> = z.object({
  flavorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopAtmosphereUpdateWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereUpdateWithoutShopInput> = z.object({
  atmosphere: z.lazy(() => AtmosphereUpdateOneRequiredWithoutShopAtmospheresNestedInputSchema).optional()
}).strict();

export const ShopAtmosphereUncheckedUpdateWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedUpdateWithoutShopInput> = z.object({
  atmosphereId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopAtmosphereUncheckedUpdateManyWithoutShopInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedUpdateManyWithoutShopInput> = z.object({
  atmosphereId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopHobbyUpdateWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyUpdateWithoutShopInput> = z.object({
  hobby: z.lazy(() => HobbyUpdateOneRequiredWithoutShopHobbiesNestedInputSchema).optional()
}).strict();

export const ShopHobbyUncheckedUpdateWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedUpdateWithoutShopInput> = z.object({
  hobbyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopHobbyUncheckedUpdateManyWithoutShopInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedUpdateManyWithoutShopInput> = z.object({
  hobbyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopPaymentMethodUpdateWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateWithoutShopInput> = z.object({
  paymentMethod: z.lazy(() => PaymentMethodUpdateOneRequiredWithoutShopPaymentMethodsNestedInputSchema).optional()
}).strict();

export const ShopPaymentMethodUncheckedUpdateWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedUpdateWithoutShopInput> = z.object({
  paymentMethodId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopPaymentMethodUncheckedUpdateManyWithoutShopInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedUpdateManyWithoutShopInput> = z.object({
  paymentMethodId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopEventUpdateWithoutShopInputSchema: z.ZodType<Prisma.ShopEventUpdateWithoutShopInput> = z.object({
  event: z.lazy(() => EventUpdateOneRequiredWithoutShopEventsNestedInputSchema).optional()
}).strict();

export const ShopEventUncheckedUpdateWithoutShopInputSchema: z.ZodType<Prisma.ShopEventUncheckedUpdateWithoutShopInput> = z.object({
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopEventUncheckedUpdateManyWithoutShopInputSchema: z.ZodType<Prisma.ShopEventUncheckedUpdateManyWithoutShopInput> = z.object({
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUpdateWithoutShopInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutShopInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ratingTaste: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingService: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingValue: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutReviewsNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutShopInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutShopInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingTaste: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingService: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingValue: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutShopInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutShopInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingTaste: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingAtmosphere: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingService: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ratingValue: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopFlavorCreateManyFlavorInputSchema: z.ZodType<Prisma.ShopFlavorCreateManyFlavorInput> = z.object({
  shopId: z.string()
}).strict();

export const ShopFlavorUpdateWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorUpdateWithoutFlavorInput> = z.object({
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutShopFlavorsNestedInputSchema).optional()
}).strict();

export const ShopFlavorUncheckedUpdateWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedUpdateWithoutFlavorInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopFlavorUncheckedUpdateManyWithoutFlavorInputSchema: z.ZodType<Prisma.ShopFlavorUncheckedUpdateManyWithoutFlavorInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopAtmosphereCreateManyAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereCreateManyAtmosphereInput> = z.object({
  shopId: z.string()
}).strict();

export const ShopAtmosphereUpdateWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereUpdateWithoutAtmosphereInput> = z.object({
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutShopAtmospheresNestedInputSchema).optional()
}).strict();

export const ShopAtmosphereUncheckedUpdateWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedUpdateWithoutAtmosphereInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopAtmosphereUncheckedUpdateManyWithoutAtmosphereInputSchema: z.ZodType<Prisma.ShopAtmosphereUncheckedUpdateManyWithoutAtmosphereInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopHobbyCreateManyHobbyInputSchema: z.ZodType<Prisma.ShopHobbyCreateManyHobbyInput> = z.object({
  shopId: z.string()
}).strict();

export const ShopHobbyUpdateWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyUpdateWithoutHobbyInput> = z.object({
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutShopHobbiesNestedInputSchema).optional()
}).strict();

export const ShopHobbyUncheckedUpdateWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedUpdateWithoutHobbyInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopHobbyUncheckedUpdateManyWithoutHobbyInputSchema: z.ZodType<Prisma.ShopHobbyUncheckedUpdateManyWithoutHobbyInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopPaymentMethodCreateManyPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodCreateManyPaymentMethodInput> = z.object({
  shopId: z.string()
}).strict();

export const ShopPaymentMethodUpdateWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateWithoutPaymentMethodInput> = z.object({
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutShopPaymentMethodsNestedInputSchema).optional()
}).strict();

export const ShopPaymentMethodUncheckedUpdateWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedUpdateWithoutPaymentMethodInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopPaymentMethodUncheckedUpdateManyWithoutPaymentMethodInputSchema: z.ZodType<Prisma.ShopPaymentMethodUncheckedUpdateManyWithoutPaymentMethodInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopEventCreateManyEventInputSchema: z.ZodType<Prisma.ShopEventCreateManyEventInput> = z.object({
  shopId: z.string()
}).strict();

export const ShopEventUpdateWithoutEventInputSchema: z.ZodType<Prisma.ShopEventUpdateWithoutEventInput> = z.object({
  shop: z.lazy(() => ShopUpdateOneRequiredWithoutShopEventsNestedInputSchema).optional()
}).strict();

export const ShopEventUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.ShopEventUncheckedUpdateWithoutEventInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ShopEventUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.ShopEventUncheckedUpdateManyWithoutEventInput> = z.object({
  shopId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(),PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const LikeFindFirstArgsSchema: z.ZodType<Prisma.LikeFindFirstArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeScalarFieldEnumSchema,LikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LikeFindFirstOrThrowArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeScalarFieldEnumSchema,LikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeFindManyArgsSchema: z.ZodType<Prisma.LikeFindManyArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeScalarFieldEnumSchema,LikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeAggregateArgsSchema: z.ZodType<Prisma.LikeAggregateArgs> = z.object({
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LikeGroupByArgsSchema: z.ZodType<Prisma.LikeGroupByArgs> = z.object({
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithAggregationInputSchema.array(),LikeOrderByWithAggregationInputSchema ]).optional(),
  by: LikeScalarFieldEnumSchema.array(),
  having: LikeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LikeFindUniqueArgsSchema: z.ZodType<Prisma.LikeFindUniqueArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const LikeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LikeFindUniqueOrThrowArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const PostTagFindFirstArgsSchema: z.ZodType<Prisma.PostTagFindFirstArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereInputSchema.optional(),
  orderBy: z.union([ PostTagOrderByWithRelationInputSchema.array(),PostTagOrderByWithRelationInputSchema ]).optional(),
  cursor: PostTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostTagScalarFieldEnumSchema,PostTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostTagFindFirstOrThrowArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereInputSchema.optional(),
  orderBy: z.union([ PostTagOrderByWithRelationInputSchema.array(),PostTagOrderByWithRelationInputSchema ]).optional(),
  cursor: PostTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostTagScalarFieldEnumSchema,PostTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostTagFindManyArgsSchema: z.ZodType<Prisma.PostTagFindManyArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereInputSchema.optional(),
  orderBy: z.union([ PostTagOrderByWithRelationInputSchema.array(),PostTagOrderByWithRelationInputSchema ]).optional(),
  cursor: PostTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostTagScalarFieldEnumSchema,PostTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostTagAggregateArgsSchema: z.ZodType<Prisma.PostTagAggregateArgs> = z.object({
  where: PostTagWhereInputSchema.optional(),
  orderBy: z.union([ PostTagOrderByWithRelationInputSchema.array(),PostTagOrderByWithRelationInputSchema ]).optional(),
  cursor: PostTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostTagGroupByArgsSchema: z.ZodType<Prisma.PostTagGroupByArgs> = z.object({
  where: PostTagWhereInputSchema.optional(),
  orderBy: z.union([ PostTagOrderByWithAggregationInputSchema.array(),PostTagOrderByWithAggregationInputSchema ]).optional(),
  by: PostTagScalarFieldEnumSchema.array(),
  having: PostTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostTagFindUniqueArgsSchema: z.ZodType<Prisma.PostTagFindUniqueArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereUniqueInputSchema,
}).strict() ;

export const PostTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostTagFindUniqueOrThrowArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereUniqueInputSchema,
}).strict() ;

export const ShopFindFirstArgsSchema: z.ZodType<Prisma.ShopFindFirstArgs> = z.object({
  select: ShopSelectSchema.optional(),
  include: ShopIncludeSchema.optional(),
  where: ShopWhereInputSchema.optional(),
  orderBy: z.union([ ShopOrderByWithRelationInputSchema.array(),ShopOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopScalarFieldEnumSchema,ShopScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ShopFindFirstOrThrowArgs> = z.object({
  select: ShopSelectSchema.optional(),
  include: ShopIncludeSchema.optional(),
  where: ShopWhereInputSchema.optional(),
  orderBy: z.union([ ShopOrderByWithRelationInputSchema.array(),ShopOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopScalarFieldEnumSchema,ShopScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopFindManyArgsSchema: z.ZodType<Prisma.ShopFindManyArgs> = z.object({
  select: ShopSelectSchema.optional(),
  include: ShopIncludeSchema.optional(),
  where: ShopWhereInputSchema.optional(),
  orderBy: z.union([ ShopOrderByWithRelationInputSchema.array(),ShopOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopScalarFieldEnumSchema,ShopScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopAggregateArgsSchema: z.ZodType<Prisma.ShopAggregateArgs> = z.object({
  where: ShopWhereInputSchema.optional(),
  orderBy: z.union([ ShopOrderByWithRelationInputSchema.array(),ShopOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopGroupByArgsSchema: z.ZodType<Prisma.ShopGroupByArgs> = z.object({
  where: ShopWhereInputSchema.optional(),
  orderBy: z.union([ ShopOrderByWithAggregationInputSchema.array(),ShopOrderByWithAggregationInputSchema ]).optional(),
  by: ShopScalarFieldEnumSchema.array(),
  having: ShopScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopFindUniqueArgsSchema: z.ZodType<Prisma.ShopFindUniqueArgs> = z.object({
  select: ShopSelectSchema.optional(),
  include: ShopIncludeSchema.optional(),
  where: ShopWhereUniqueInputSchema,
}).strict() ;

export const ShopFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ShopFindUniqueOrThrowArgs> = z.object({
  select: ShopSelectSchema.optional(),
  include: ShopIncludeSchema.optional(),
  where: ShopWhereUniqueInputSchema,
}).strict() ;

export const FlavorFindFirstArgsSchema: z.ZodType<Prisma.FlavorFindFirstArgs> = z.object({
  select: FlavorSelectSchema.optional(),
  include: FlavorIncludeSchema.optional(),
  where: FlavorWhereInputSchema.optional(),
  orderBy: z.union([ FlavorOrderByWithRelationInputSchema.array(),FlavorOrderByWithRelationInputSchema ]).optional(),
  cursor: FlavorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FlavorScalarFieldEnumSchema,FlavorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FlavorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FlavorFindFirstOrThrowArgs> = z.object({
  select: FlavorSelectSchema.optional(),
  include: FlavorIncludeSchema.optional(),
  where: FlavorWhereInputSchema.optional(),
  orderBy: z.union([ FlavorOrderByWithRelationInputSchema.array(),FlavorOrderByWithRelationInputSchema ]).optional(),
  cursor: FlavorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FlavorScalarFieldEnumSchema,FlavorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FlavorFindManyArgsSchema: z.ZodType<Prisma.FlavorFindManyArgs> = z.object({
  select: FlavorSelectSchema.optional(),
  include: FlavorIncludeSchema.optional(),
  where: FlavorWhereInputSchema.optional(),
  orderBy: z.union([ FlavorOrderByWithRelationInputSchema.array(),FlavorOrderByWithRelationInputSchema ]).optional(),
  cursor: FlavorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FlavorScalarFieldEnumSchema,FlavorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FlavorAggregateArgsSchema: z.ZodType<Prisma.FlavorAggregateArgs> = z.object({
  where: FlavorWhereInputSchema.optional(),
  orderBy: z.union([ FlavorOrderByWithRelationInputSchema.array(),FlavorOrderByWithRelationInputSchema ]).optional(),
  cursor: FlavorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FlavorGroupByArgsSchema: z.ZodType<Prisma.FlavorGroupByArgs> = z.object({
  where: FlavorWhereInputSchema.optional(),
  orderBy: z.union([ FlavorOrderByWithAggregationInputSchema.array(),FlavorOrderByWithAggregationInputSchema ]).optional(),
  by: FlavorScalarFieldEnumSchema.array(),
  having: FlavorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FlavorFindUniqueArgsSchema: z.ZodType<Prisma.FlavorFindUniqueArgs> = z.object({
  select: FlavorSelectSchema.optional(),
  include: FlavorIncludeSchema.optional(),
  where: FlavorWhereUniqueInputSchema,
}).strict() ;

export const FlavorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FlavorFindUniqueOrThrowArgs> = z.object({
  select: FlavorSelectSchema.optional(),
  include: FlavorIncludeSchema.optional(),
  where: FlavorWhereUniqueInputSchema,
}).strict() ;

export const AtmosphereFindFirstArgsSchema: z.ZodType<Prisma.AtmosphereFindFirstArgs> = z.object({
  select: AtmosphereSelectSchema.optional(),
  include: AtmosphereIncludeSchema.optional(),
  where: AtmosphereWhereInputSchema.optional(),
  orderBy: z.union([ AtmosphereOrderByWithRelationInputSchema.array(),AtmosphereOrderByWithRelationInputSchema ]).optional(),
  cursor: AtmosphereWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AtmosphereScalarFieldEnumSchema,AtmosphereScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AtmosphereFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AtmosphereFindFirstOrThrowArgs> = z.object({
  select: AtmosphereSelectSchema.optional(),
  include: AtmosphereIncludeSchema.optional(),
  where: AtmosphereWhereInputSchema.optional(),
  orderBy: z.union([ AtmosphereOrderByWithRelationInputSchema.array(),AtmosphereOrderByWithRelationInputSchema ]).optional(),
  cursor: AtmosphereWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AtmosphereScalarFieldEnumSchema,AtmosphereScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AtmosphereFindManyArgsSchema: z.ZodType<Prisma.AtmosphereFindManyArgs> = z.object({
  select: AtmosphereSelectSchema.optional(),
  include: AtmosphereIncludeSchema.optional(),
  where: AtmosphereWhereInputSchema.optional(),
  orderBy: z.union([ AtmosphereOrderByWithRelationInputSchema.array(),AtmosphereOrderByWithRelationInputSchema ]).optional(),
  cursor: AtmosphereWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AtmosphereScalarFieldEnumSchema,AtmosphereScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AtmosphereAggregateArgsSchema: z.ZodType<Prisma.AtmosphereAggregateArgs> = z.object({
  where: AtmosphereWhereInputSchema.optional(),
  orderBy: z.union([ AtmosphereOrderByWithRelationInputSchema.array(),AtmosphereOrderByWithRelationInputSchema ]).optional(),
  cursor: AtmosphereWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AtmosphereGroupByArgsSchema: z.ZodType<Prisma.AtmosphereGroupByArgs> = z.object({
  where: AtmosphereWhereInputSchema.optional(),
  orderBy: z.union([ AtmosphereOrderByWithAggregationInputSchema.array(),AtmosphereOrderByWithAggregationInputSchema ]).optional(),
  by: AtmosphereScalarFieldEnumSchema.array(),
  having: AtmosphereScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AtmosphereFindUniqueArgsSchema: z.ZodType<Prisma.AtmosphereFindUniqueArgs> = z.object({
  select: AtmosphereSelectSchema.optional(),
  include: AtmosphereIncludeSchema.optional(),
  where: AtmosphereWhereUniqueInputSchema,
}).strict() ;

export const AtmosphereFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AtmosphereFindUniqueOrThrowArgs> = z.object({
  select: AtmosphereSelectSchema.optional(),
  include: AtmosphereIncludeSchema.optional(),
  where: AtmosphereWhereUniqueInputSchema,
}).strict() ;

export const HobbyFindFirstArgsSchema: z.ZodType<Prisma.HobbyFindFirstArgs> = z.object({
  select: HobbySelectSchema.optional(),
  include: HobbyIncludeSchema.optional(),
  where: HobbyWhereInputSchema.optional(),
  orderBy: z.union([ HobbyOrderByWithRelationInputSchema.array(),HobbyOrderByWithRelationInputSchema ]).optional(),
  cursor: HobbyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HobbyScalarFieldEnumSchema,HobbyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HobbyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HobbyFindFirstOrThrowArgs> = z.object({
  select: HobbySelectSchema.optional(),
  include: HobbyIncludeSchema.optional(),
  where: HobbyWhereInputSchema.optional(),
  orderBy: z.union([ HobbyOrderByWithRelationInputSchema.array(),HobbyOrderByWithRelationInputSchema ]).optional(),
  cursor: HobbyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HobbyScalarFieldEnumSchema,HobbyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HobbyFindManyArgsSchema: z.ZodType<Prisma.HobbyFindManyArgs> = z.object({
  select: HobbySelectSchema.optional(),
  include: HobbyIncludeSchema.optional(),
  where: HobbyWhereInputSchema.optional(),
  orderBy: z.union([ HobbyOrderByWithRelationInputSchema.array(),HobbyOrderByWithRelationInputSchema ]).optional(),
  cursor: HobbyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HobbyScalarFieldEnumSchema,HobbyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HobbyAggregateArgsSchema: z.ZodType<Prisma.HobbyAggregateArgs> = z.object({
  where: HobbyWhereInputSchema.optional(),
  orderBy: z.union([ HobbyOrderByWithRelationInputSchema.array(),HobbyOrderByWithRelationInputSchema ]).optional(),
  cursor: HobbyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HobbyGroupByArgsSchema: z.ZodType<Prisma.HobbyGroupByArgs> = z.object({
  where: HobbyWhereInputSchema.optional(),
  orderBy: z.union([ HobbyOrderByWithAggregationInputSchema.array(),HobbyOrderByWithAggregationInputSchema ]).optional(),
  by: HobbyScalarFieldEnumSchema.array(),
  having: HobbyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HobbyFindUniqueArgsSchema: z.ZodType<Prisma.HobbyFindUniqueArgs> = z.object({
  select: HobbySelectSchema.optional(),
  include: HobbyIncludeSchema.optional(),
  where: HobbyWhereUniqueInputSchema,
}).strict() ;

export const HobbyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HobbyFindUniqueOrThrowArgs> = z.object({
  select: HobbySelectSchema.optional(),
  include: HobbyIncludeSchema.optional(),
  where: HobbyWhereUniqueInputSchema,
}).strict() ;

export const PaymentMethodFindFirstArgsSchema: z.ZodType<Prisma.PaymentMethodFindFirstArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ PaymentMethodOrderByWithRelationInputSchema.array(),PaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentMethodScalarFieldEnumSchema,PaymentMethodScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PaymentMethodFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PaymentMethodFindFirstOrThrowArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ PaymentMethodOrderByWithRelationInputSchema.array(),PaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentMethodScalarFieldEnumSchema,PaymentMethodScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PaymentMethodFindManyArgsSchema: z.ZodType<Prisma.PaymentMethodFindManyArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ PaymentMethodOrderByWithRelationInputSchema.array(),PaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentMethodScalarFieldEnumSchema,PaymentMethodScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PaymentMethodAggregateArgsSchema: z.ZodType<Prisma.PaymentMethodAggregateArgs> = z.object({
  where: PaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ PaymentMethodOrderByWithRelationInputSchema.array(),PaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PaymentMethodGroupByArgsSchema: z.ZodType<Prisma.PaymentMethodGroupByArgs> = z.object({
  where: PaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ PaymentMethodOrderByWithAggregationInputSchema.array(),PaymentMethodOrderByWithAggregationInputSchema ]).optional(),
  by: PaymentMethodScalarFieldEnumSchema.array(),
  having: PaymentMethodScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PaymentMethodFindUniqueArgsSchema: z.ZodType<Prisma.PaymentMethodFindUniqueArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereUniqueInputSchema,
}).strict() ;

export const PaymentMethodFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PaymentMethodFindUniqueOrThrowArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereUniqueInputSchema,
}).strict() ;

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithAggregationInputSchema.array(),EventOrderByWithAggregationInputSchema ]).optional(),
  by: EventScalarFieldEnumSchema.array(),
  having: EventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const ShopFlavorFindFirstArgsSchema: z.ZodType<Prisma.ShopFlavorFindFirstArgs> = z.object({
  select: ShopFlavorSelectSchema.optional(),
  include: ShopFlavorIncludeSchema.optional(),
  where: ShopFlavorWhereInputSchema.optional(),
  orderBy: z.union([ ShopFlavorOrderByWithRelationInputSchema.array(),ShopFlavorOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopFlavorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopFlavorScalarFieldEnumSchema,ShopFlavorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopFlavorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ShopFlavorFindFirstOrThrowArgs> = z.object({
  select: ShopFlavorSelectSchema.optional(),
  include: ShopFlavorIncludeSchema.optional(),
  where: ShopFlavorWhereInputSchema.optional(),
  orderBy: z.union([ ShopFlavorOrderByWithRelationInputSchema.array(),ShopFlavorOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopFlavorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopFlavorScalarFieldEnumSchema,ShopFlavorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopFlavorFindManyArgsSchema: z.ZodType<Prisma.ShopFlavorFindManyArgs> = z.object({
  select: ShopFlavorSelectSchema.optional(),
  include: ShopFlavorIncludeSchema.optional(),
  where: ShopFlavorWhereInputSchema.optional(),
  orderBy: z.union([ ShopFlavorOrderByWithRelationInputSchema.array(),ShopFlavorOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopFlavorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopFlavorScalarFieldEnumSchema,ShopFlavorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopFlavorAggregateArgsSchema: z.ZodType<Prisma.ShopFlavorAggregateArgs> = z.object({
  where: ShopFlavorWhereInputSchema.optional(),
  orderBy: z.union([ ShopFlavorOrderByWithRelationInputSchema.array(),ShopFlavorOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopFlavorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopFlavorGroupByArgsSchema: z.ZodType<Prisma.ShopFlavorGroupByArgs> = z.object({
  where: ShopFlavorWhereInputSchema.optional(),
  orderBy: z.union([ ShopFlavorOrderByWithAggregationInputSchema.array(),ShopFlavorOrderByWithAggregationInputSchema ]).optional(),
  by: ShopFlavorScalarFieldEnumSchema.array(),
  having: ShopFlavorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopFlavorFindUniqueArgsSchema: z.ZodType<Prisma.ShopFlavorFindUniqueArgs> = z.object({
  select: ShopFlavorSelectSchema.optional(),
  include: ShopFlavorIncludeSchema.optional(),
  where: ShopFlavorWhereUniqueInputSchema,
}).strict() ;

export const ShopFlavorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ShopFlavorFindUniqueOrThrowArgs> = z.object({
  select: ShopFlavorSelectSchema.optional(),
  include: ShopFlavorIncludeSchema.optional(),
  where: ShopFlavorWhereUniqueInputSchema,
}).strict() ;

export const ShopAtmosphereFindFirstArgsSchema: z.ZodType<Prisma.ShopAtmosphereFindFirstArgs> = z.object({
  select: ShopAtmosphereSelectSchema.optional(),
  include: ShopAtmosphereIncludeSchema.optional(),
  where: ShopAtmosphereWhereInputSchema.optional(),
  orderBy: z.union([ ShopAtmosphereOrderByWithRelationInputSchema.array(),ShopAtmosphereOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopAtmosphereWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopAtmosphereScalarFieldEnumSchema,ShopAtmosphereScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopAtmosphereFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ShopAtmosphereFindFirstOrThrowArgs> = z.object({
  select: ShopAtmosphereSelectSchema.optional(),
  include: ShopAtmosphereIncludeSchema.optional(),
  where: ShopAtmosphereWhereInputSchema.optional(),
  orderBy: z.union([ ShopAtmosphereOrderByWithRelationInputSchema.array(),ShopAtmosphereOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopAtmosphereWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopAtmosphereScalarFieldEnumSchema,ShopAtmosphereScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopAtmosphereFindManyArgsSchema: z.ZodType<Prisma.ShopAtmosphereFindManyArgs> = z.object({
  select: ShopAtmosphereSelectSchema.optional(),
  include: ShopAtmosphereIncludeSchema.optional(),
  where: ShopAtmosphereWhereInputSchema.optional(),
  orderBy: z.union([ ShopAtmosphereOrderByWithRelationInputSchema.array(),ShopAtmosphereOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopAtmosphereWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopAtmosphereScalarFieldEnumSchema,ShopAtmosphereScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopAtmosphereAggregateArgsSchema: z.ZodType<Prisma.ShopAtmosphereAggregateArgs> = z.object({
  where: ShopAtmosphereWhereInputSchema.optional(),
  orderBy: z.union([ ShopAtmosphereOrderByWithRelationInputSchema.array(),ShopAtmosphereOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopAtmosphereWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopAtmosphereGroupByArgsSchema: z.ZodType<Prisma.ShopAtmosphereGroupByArgs> = z.object({
  where: ShopAtmosphereWhereInputSchema.optional(),
  orderBy: z.union([ ShopAtmosphereOrderByWithAggregationInputSchema.array(),ShopAtmosphereOrderByWithAggregationInputSchema ]).optional(),
  by: ShopAtmosphereScalarFieldEnumSchema.array(),
  having: ShopAtmosphereScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopAtmosphereFindUniqueArgsSchema: z.ZodType<Prisma.ShopAtmosphereFindUniqueArgs> = z.object({
  select: ShopAtmosphereSelectSchema.optional(),
  include: ShopAtmosphereIncludeSchema.optional(),
  where: ShopAtmosphereWhereUniqueInputSchema,
}).strict() ;

export const ShopAtmosphereFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ShopAtmosphereFindUniqueOrThrowArgs> = z.object({
  select: ShopAtmosphereSelectSchema.optional(),
  include: ShopAtmosphereIncludeSchema.optional(),
  where: ShopAtmosphereWhereUniqueInputSchema,
}).strict() ;

export const ShopHobbyFindFirstArgsSchema: z.ZodType<Prisma.ShopHobbyFindFirstArgs> = z.object({
  select: ShopHobbySelectSchema.optional(),
  include: ShopHobbyIncludeSchema.optional(),
  where: ShopHobbyWhereInputSchema.optional(),
  orderBy: z.union([ ShopHobbyOrderByWithRelationInputSchema.array(),ShopHobbyOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopHobbyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopHobbyScalarFieldEnumSchema,ShopHobbyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopHobbyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ShopHobbyFindFirstOrThrowArgs> = z.object({
  select: ShopHobbySelectSchema.optional(),
  include: ShopHobbyIncludeSchema.optional(),
  where: ShopHobbyWhereInputSchema.optional(),
  orderBy: z.union([ ShopHobbyOrderByWithRelationInputSchema.array(),ShopHobbyOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopHobbyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopHobbyScalarFieldEnumSchema,ShopHobbyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopHobbyFindManyArgsSchema: z.ZodType<Prisma.ShopHobbyFindManyArgs> = z.object({
  select: ShopHobbySelectSchema.optional(),
  include: ShopHobbyIncludeSchema.optional(),
  where: ShopHobbyWhereInputSchema.optional(),
  orderBy: z.union([ ShopHobbyOrderByWithRelationInputSchema.array(),ShopHobbyOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopHobbyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopHobbyScalarFieldEnumSchema,ShopHobbyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopHobbyAggregateArgsSchema: z.ZodType<Prisma.ShopHobbyAggregateArgs> = z.object({
  where: ShopHobbyWhereInputSchema.optional(),
  orderBy: z.union([ ShopHobbyOrderByWithRelationInputSchema.array(),ShopHobbyOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopHobbyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopHobbyGroupByArgsSchema: z.ZodType<Prisma.ShopHobbyGroupByArgs> = z.object({
  where: ShopHobbyWhereInputSchema.optional(),
  orderBy: z.union([ ShopHobbyOrderByWithAggregationInputSchema.array(),ShopHobbyOrderByWithAggregationInputSchema ]).optional(),
  by: ShopHobbyScalarFieldEnumSchema.array(),
  having: ShopHobbyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopHobbyFindUniqueArgsSchema: z.ZodType<Prisma.ShopHobbyFindUniqueArgs> = z.object({
  select: ShopHobbySelectSchema.optional(),
  include: ShopHobbyIncludeSchema.optional(),
  where: ShopHobbyWhereUniqueInputSchema,
}).strict() ;

export const ShopHobbyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ShopHobbyFindUniqueOrThrowArgs> = z.object({
  select: ShopHobbySelectSchema.optional(),
  include: ShopHobbyIncludeSchema.optional(),
  where: ShopHobbyWhereUniqueInputSchema,
}).strict() ;

export const ShopPaymentMethodFindFirstArgsSchema: z.ZodType<Prisma.ShopPaymentMethodFindFirstArgs> = z.object({
  select: ShopPaymentMethodSelectSchema.optional(),
  include: ShopPaymentMethodIncludeSchema.optional(),
  where: ShopPaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ ShopPaymentMethodOrderByWithRelationInputSchema.array(),ShopPaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopPaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopPaymentMethodScalarFieldEnumSchema,ShopPaymentMethodScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopPaymentMethodFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ShopPaymentMethodFindFirstOrThrowArgs> = z.object({
  select: ShopPaymentMethodSelectSchema.optional(),
  include: ShopPaymentMethodIncludeSchema.optional(),
  where: ShopPaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ ShopPaymentMethodOrderByWithRelationInputSchema.array(),ShopPaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopPaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopPaymentMethodScalarFieldEnumSchema,ShopPaymentMethodScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopPaymentMethodFindManyArgsSchema: z.ZodType<Prisma.ShopPaymentMethodFindManyArgs> = z.object({
  select: ShopPaymentMethodSelectSchema.optional(),
  include: ShopPaymentMethodIncludeSchema.optional(),
  where: ShopPaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ ShopPaymentMethodOrderByWithRelationInputSchema.array(),ShopPaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopPaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopPaymentMethodScalarFieldEnumSchema,ShopPaymentMethodScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopPaymentMethodAggregateArgsSchema: z.ZodType<Prisma.ShopPaymentMethodAggregateArgs> = z.object({
  where: ShopPaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ ShopPaymentMethodOrderByWithRelationInputSchema.array(),ShopPaymentMethodOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopPaymentMethodWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopPaymentMethodGroupByArgsSchema: z.ZodType<Prisma.ShopPaymentMethodGroupByArgs> = z.object({
  where: ShopPaymentMethodWhereInputSchema.optional(),
  orderBy: z.union([ ShopPaymentMethodOrderByWithAggregationInputSchema.array(),ShopPaymentMethodOrderByWithAggregationInputSchema ]).optional(),
  by: ShopPaymentMethodScalarFieldEnumSchema.array(),
  having: ShopPaymentMethodScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopPaymentMethodFindUniqueArgsSchema: z.ZodType<Prisma.ShopPaymentMethodFindUniqueArgs> = z.object({
  select: ShopPaymentMethodSelectSchema.optional(),
  include: ShopPaymentMethodIncludeSchema.optional(),
  where: ShopPaymentMethodWhereUniqueInputSchema,
}).strict() ;

export const ShopPaymentMethodFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ShopPaymentMethodFindUniqueOrThrowArgs> = z.object({
  select: ShopPaymentMethodSelectSchema.optional(),
  include: ShopPaymentMethodIncludeSchema.optional(),
  where: ShopPaymentMethodWhereUniqueInputSchema,
}).strict() ;

export const ShopEventFindFirstArgsSchema: z.ZodType<Prisma.ShopEventFindFirstArgs> = z.object({
  select: ShopEventSelectSchema.optional(),
  include: ShopEventIncludeSchema.optional(),
  where: ShopEventWhereInputSchema.optional(),
  orderBy: z.union([ ShopEventOrderByWithRelationInputSchema.array(),ShopEventOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopEventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopEventScalarFieldEnumSchema,ShopEventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopEventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ShopEventFindFirstOrThrowArgs> = z.object({
  select: ShopEventSelectSchema.optional(),
  include: ShopEventIncludeSchema.optional(),
  where: ShopEventWhereInputSchema.optional(),
  orderBy: z.union([ ShopEventOrderByWithRelationInputSchema.array(),ShopEventOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopEventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopEventScalarFieldEnumSchema,ShopEventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopEventFindManyArgsSchema: z.ZodType<Prisma.ShopEventFindManyArgs> = z.object({
  select: ShopEventSelectSchema.optional(),
  include: ShopEventIncludeSchema.optional(),
  where: ShopEventWhereInputSchema.optional(),
  orderBy: z.union([ ShopEventOrderByWithRelationInputSchema.array(),ShopEventOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopEventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ShopEventScalarFieldEnumSchema,ShopEventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ShopEventAggregateArgsSchema: z.ZodType<Prisma.ShopEventAggregateArgs> = z.object({
  where: ShopEventWhereInputSchema.optional(),
  orderBy: z.union([ ShopEventOrderByWithRelationInputSchema.array(),ShopEventOrderByWithRelationInputSchema ]).optional(),
  cursor: ShopEventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopEventGroupByArgsSchema: z.ZodType<Prisma.ShopEventGroupByArgs> = z.object({
  where: ShopEventWhereInputSchema.optional(),
  orderBy: z.union([ ShopEventOrderByWithAggregationInputSchema.array(),ShopEventOrderByWithAggregationInputSchema ]).optional(),
  by: ShopEventScalarFieldEnumSchema.array(),
  having: ShopEventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ShopEventFindUniqueArgsSchema: z.ZodType<Prisma.ShopEventFindUniqueArgs> = z.object({
  select: ShopEventSelectSchema.optional(),
  include: ShopEventIncludeSchema.optional(),
  where: ShopEventWhereUniqueInputSchema,
}).strict() ;

export const ShopEventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ShopEventFindUniqueOrThrowArgs> = z.object({
  select: ShopEventSelectSchema.optional(),
  include: ShopEventIncludeSchema.optional(),
  where: ShopEventWhereUniqueInputSchema,
}).strict() ;

export const ReviewFindFirstArgsSchema: z.ZodType<Prisma.ReviewFindFirstArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindFirstOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewFindManyArgsSchema: z.ZodType<Prisma.ReviewFindManyArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewAggregateArgsSchema: z.ZodType<Prisma.ReviewAggregateArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReviewGroupByArgsSchema: z.ZodType<Prisma.ReviewGroupByArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithAggregationInputSchema.array(),ReviewOrderByWithAggregationInputSchema ]).optional(),
  by: ReviewScalarFieldEnumSchema.array(),
  having: ReviewScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReviewFindUniqueArgsSchema: z.ZodType<Prisma.ReviewFindUniqueArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindUniqueOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict() ;

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
}).strict() ;

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
}).strict() ;

export const PostCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostCreateManyAndReturnArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
}).strict() ;

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
}).strict() ;

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
}).strict() ;

export const LikeCreateArgsSchema: z.ZodType<Prisma.LikeCreateArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  data: z.union([ LikeCreateInputSchema,LikeUncheckedCreateInputSchema ]),
}).strict() ;

export const LikeUpsertArgsSchema: z.ZodType<Prisma.LikeUpsertArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
  create: z.union([ LikeCreateInputSchema,LikeUncheckedCreateInputSchema ]),
  update: z.union([ LikeUpdateInputSchema,LikeUncheckedUpdateInputSchema ]),
}).strict() ;

export const LikeCreateManyArgsSchema: z.ZodType<Prisma.LikeCreateManyArgs> = z.object({
  data: z.union([ LikeCreateManyInputSchema,LikeCreateManyInputSchema.array() ]),
}).strict() ;

export const LikeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LikeCreateManyAndReturnArgs> = z.object({
  data: z.union([ LikeCreateManyInputSchema,LikeCreateManyInputSchema.array() ]),
}).strict() ;

export const LikeDeleteArgsSchema: z.ZodType<Prisma.LikeDeleteArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const LikeUpdateArgsSchema: z.ZodType<Prisma.LikeUpdateArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  data: z.union([ LikeUpdateInputSchema,LikeUncheckedUpdateInputSchema ]),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const LikeUpdateManyArgsSchema: z.ZodType<Prisma.LikeUpdateManyArgs> = z.object({
  data: z.union([ LikeUpdateManyMutationInputSchema,LikeUncheckedUpdateManyInputSchema ]),
  where: LikeWhereInputSchema.optional(),
}).strict() ;

export const LikeDeleteManyArgsSchema: z.ZodType<Prisma.LikeDeleteManyArgs> = z.object({
  where: LikeWhereInputSchema.optional(),
}).strict() ;

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict() ;

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
}).strict() ;

export const CommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
}).strict() ;

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
}).strict() ;

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
}).strict() ;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
}).strict() ;

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const PostTagCreateArgsSchema: z.ZodType<Prisma.PostTagCreateArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  data: z.union([ PostTagCreateInputSchema,PostTagUncheckedCreateInputSchema ]),
}).strict() ;

export const PostTagUpsertArgsSchema: z.ZodType<Prisma.PostTagUpsertArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereUniqueInputSchema,
  create: z.union([ PostTagCreateInputSchema,PostTagUncheckedCreateInputSchema ]),
  update: z.union([ PostTagUpdateInputSchema,PostTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const PostTagCreateManyArgsSchema: z.ZodType<Prisma.PostTagCreateManyArgs> = z.object({
  data: z.union([ PostTagCreateManyInputSchema,PostTagCreateManyInputSchema.array() ]),
}).strict() ;

export const PostTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ PostTagCreateManyInputSchema,PostTagCreateManyInputSchema.array() ]),
}).strict() ;

export const PostTagDeleteArgsSchema: z.ZodType<Prisma.PostTagDeleteArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  where: PostTagWhereUniqueInputSchema,
}).strict() ;

export const PostTagUpdateArgsSchema: z.ZodType<Prisma.PostTagUpdateArgs> = z.object({
  select: PostTagSelectSchema.optional(),
  include: PostTagIncludeSchema.optional(),
  data: z.union([ PostTagUpdateInputSchema,PostTagUncheckedUpdateInputSchema ]),
  where: PostTagWhereUniqueInputSchema,
}).strict() ;

export const PostTagUpdateManyArgsSchema: z.ZodType<Prisma.PostTagUpdateManyArgs> = z.object({
  data: z.union([ PostTagUpdateManyMutationInputSchema,PostTagUncheckedUpdateManyInputSchema ]),
  where: PostTagWhereInputSchema.optional(),
}).strict() ;

export const PostTagDeleteManyArgsSchema: z.ZodType<Prisma.PostTagDeleteManyArgs> = z.object({
  where: PostTagWhereInputSchema.optional(),
}).strict() ;

export const ShopCreateArgsSchema: z.ZodType<Prisma.ShopCreateArgs> = z.object({
  select: ShopSelectSchema.optional(),
  include: ShopIncludeSchema.optional(),
  data: z.union([ ShopCreateInputSchema,ShopUncheckedCreateInputSchema ]),
}).strict() ;

export const ShopUpsertArgsSchema: z.ZodType<Prisma.ShopUpsertArgs> = z.object({
  select: ShopSelectSchema.optional(),
  include: ShopIncludeSchema.optional(),
  where: ShopWhereUniqueInputSchema,
  create: z.union([ ShopCreateInputSchema,ShopUncheckedCreateInputSchema ]),
  update: z.union([ ShopUpdateInputSchema,ShopUncheckedUpdateInputSchema ]),
}).strict() ;

export const ShopCreateManyArgsSchema: z.ZodType<Prisma.ShopCreateManyArgs> = z.object({
  data: z.union([ ShopCreateManyInputSchema,ShopCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShopCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShopCreateManyInputSchema,ShopCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopDeleteArgsSchema: z.ZodType<Prisma.ShopDeleteArgs> = z.object({
  select: ShopSelectSchema.optional(),
  include: ShopIncludeSchema.optional(),
  where: ShopWhereUniqueInputSchema,
}).strict() ;

export const ShopUpdateArgsSchema: z.ZodType<Prisma.ShopUpdateArgs> = z.object({
  select: ShopSelectSchema.optional(),
  include: ShopIncludeSchema.optional(),
  data: z.union([ ShopUpdateInputSchema,ShopUncheckedUpdateInputSchema ]),
  where: ShopWhereUniqueInputSchema,
}).strict() ;

export const ShopUpdateManyArgsSchema: z.ZodType<Prisma.ShopUpdateManyArgs> = z.object({
  data: z.union([ ShopUpdateManyMutationInputSchema,ShopUncheckedUpdateManyInputSchema ]),
  where: ShopWhereInputSchema.optional(),
}).strict() ;

export const ShopDeleteManyArgsSchema: z.ZodType<Prisma.ShopDeleteManyArgs> = z.object({
  where: ShopWhereInputSchema.optional(),
}).strict() ;

export const FlavorCreateArgsSchema: z.ZodType<Prisma.FlavorCreateArgs> = z.object({
  select: FlavorSelectSchema.optional(),
  include: FlavorIncludeSchema.optional(),
  data: z.union([ FlavorCreateInputSchema,FlavorUncheckedCreateInputSchema ]),
}).strict() ;

export const FlavorUpsertArgsSchema: z.ZodType<Prisma.FlavorUpsertArgs> = z.object({
  select: FlavorSelectSchema.optional(),
  include: FlavorIncludeSchema.optional(),
  where: FlavorWhereUniqueInputSchema,
  create: z.union([ FlavorCreateInputSchema,FlavorUncheckedCreateInputSchema ]),
  update: z.union([ FlavorUpdateInputSchema,FlavorUncheckedUpdateInputSchema ]),
}).strict() ;

export const FlavorCreateManyArgsSchema: z.ZodType<Prisma.FlavorCreateManyArgs> = z.object({
  data: z.union([ FlavorCreateManyInputSchema,FlavorCreateManyInputSchema.array() ]),
}).strict() ;

export const FlavorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FlavorCreateManyAndReturnArgs> = z.object({
  data: z.union([ FlavorCreateManyInputSchema,FlavorCreateManyInputSchema.array() ]),
}).strict() ;

export const FlavorDeleteArgsSchema: z.ZodType<Prisma.FlavorDeleteArgs> = z.object({
  select: FlavorSelectSchema.optional(),
  include: FlavorIncludeSchema.optional(),
  where: FlavorWhereUniqueInputSchema,
}).strict() ;

export const FlavorUpdateArgsSchema: z.ZodType<Prisma.FlavorUpdateArgs> = z.object({
  select: FlavorSelectSchema.optional(),
  include: FlavorIncludeSchema.optional(),
  data: z.union([ FlavorUpdateInputSchema,FlavorUncheckedUpdateInputSchema ]),
  where: FlavorWhereUniqueInputSchema,
}).strict() ;

export const FlavorUpdateManyArgsSchema: z.ZodType<Prisma.FlavorUpdateManyArgs> = z.object({
  data: z.union([ FlavorUpdateManyMutationInputSchema,FlavorUncheckedUpdateManyInputSchema ]),
  where: FlavorWhereInputSchema.optional(),
}).strict() ;

export const FlavorDeleteManyArgsSchema: z.ZodType<Prisma.FlavorDeleteManyArgs> = z.object({
  where: FlavorWhereInputSchema.optional(),
}).strict() ;

export const AtmosphereCreateArgsSchema: z.ZodType<Prisma.AtmosphereCreateArgs> = z.object({
  select: AtmosphereSelectSchema.optional(),
  include: AtmosphereIncludeSchema.optional(),
  data: z.union([ AtmosphereCreateInputSchema,AtmosphereUncheckedCreateInputSchema ]),
}).strict() ;

export const AtmosphereUpsertArgsSchema: z.ZodType<Prisma.AtmosphereUpsertArgs> = z.object({
  select: AtmosphereSelectSchema.optional(),
  include: AtmosphereIncludeSchema.optional(),
  where: AtmosphereWhereUniqueInputSchema,
  create: z.union([ AtmosphereCreateInputSchema,AtmosphereUncheckedCreateInputSchema ]),
  update: z.union([ AtmosphereUpdateInputSchema,AtmosphereUncheckedUpdateInputSchema ]),
}).strict() ;

export const AtmosphereCreateManyArgsSchema: z.ZodType<Prisma.AtmosphereCreateManyArgs> = z.object({
  data: z.union([ AtmosphereCreateManyInputSchema,AtmosphereCreateManyInputSchema.array() ]),
}).strict() ;

export const AtmosphereCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AtmosphereCreateManyAndReturnArgs> = z.object({
  data: z.union([ AtmosphereCreateManyInputSchema,AtmosphereCreateManyInputSchema.array() ]),
}).strict() ;

export const AtmosphereDeleteArgsSchema: z.ZodType<Prisma.AtmosphereDeleteArgs> = z.object({
  select: AtmosphereSelectSchema.optional(),
  include: AtmosphereIncludeSchema.optional(),
  where: AtmosphereWhereUniqueInputSchema,
}).strict() ;

export const AtmosphereUpdateArgsSchema: z.ZodType<Prisma.AtmosphereUpdateArgs> = z.object({
  select: AtmosphereSelectSchema.optional(),
  include: AtmosphereIncludeSchema.optional(),
  data: z.union([ AtmosphereUpdateInputSchema,AtmosphereUncheckedUpdateInputSchema ]),
  where: AtmosphereWhereUniqueInputSchema,
}).strict() ;

export const AtmosphereUpdateManyArgsSchema: z.ZodType<Prisma.AtmosphereUpdateManyArgs> = z.object({
  data: z.union([ AtmosphereUpdateManyMutationInputSchema,AtmosphereUncheckedUpdateManyInputSchema ]),
  where: AtmosphereWhereInputSchema.optional(),
}).strict() ;

export const AtmosphereDeleteManyArgsSchema: z.ZodType<Prisma.AtmosphereDeleteManyArgs> = z.object({
  where: AtmosphereWhereInputSchema.optional(),
}).strict() ;

export const HobbyCreateArgsSchema: z.ZodType<Prisma.HobbyCreateArgs> = z.object({
  select: HobbySelectSchema.optional(),
  include: HobbyIncludeSchema.optional(),
  data: z.union([ HobbyCreateInputSchema,HobbyUncheckedCreateInputSchema ]),
}).strict() ;

export const HobbyUpsertArgsSchema: z.ZodType<Prisma.HobbyUpsertArgs> = z.object({
  select: HobbySelectSchema.optional(),
  include: HobbyIncludeSchema.optional(),
  where: HobbyWhereUniqueInputSchema,
  create: z.union([ HobbyCreateInputSchema,HobbyUncheckedCreateInputSchema ]),
  update: z.union([ HobbyUpdateInputSchema,HobbyUncheckedUpdateInputSchema ]),
}).strict() ;

export const HobbyCreateManyArgsSchema: z.ZodType<Prisma.HobbyCreateManyArgs> = z.object({
  data: z.union([ HobbyCreateManyInputSchema,HobbyCreateManyInputSchema.array() ]),
}).strict() ;

export const HobbyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.HobbyCreateManyAndReturnArgs> = z.object({
  data: z.union([ HobbyCreateManyInputSchema,HobbyCreateManyInputSchema.array() ]),
}).strict() ;

export const HobbyDeleteArgsSchema: z.ZodType<Prisma.HobbyDeleteArgs> = z.object({
  select: HobbySelectSchema.optional(),
  include: HobbyIncludeSchema.optional(),
  where: HobbyWhereUniqueInputSchema,
}).strict() ;

export const HobbyUpdateArgsSchema: z.ZodType<Prisma.HobbyUpdateArgs> = z.object({
  select: HobbySelectSchema.optional(),
  include: HobbyIncludeSchema.optional(),
  data: z.union([ HobbyUpdateInputSchema,HobbyUncheckedUpdateInputSchema ]),
  where: HobbyWhereUniqueInputSchema,
}).strict() ;

export const HobbyUpdateManyArgsSchema: z.ZodType<Prisma.HobbyUpdateManyArgs> = z.object({
  data: z.union([ HobbyUpdateManyMutationInputSchema,HobbyUncheckedUpdateManyInputSchema ]),
  where: HobbyWhereInputSchema.optional(),
}).strict() ;

export const HobbyDeleteManyArgsSchema: z.ZodType<Prisma.HobbyDeleteManyArgs> = z.object({
  where: HobbyWhereInputSchema.optional(),
}).strict() ;

export const PaymentMethodCreateArgsSchema: z.ZodType<Prisma.PaymentMethodCreateArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  data: z.union([ PaymentMethodCreateInputSchema,PaymentMethodUncheckedCreateInputSchema ]),
}).strict() ;

export const PaymentMethodUpsertArgsSchema: z.ZodType<Prisma.PaymentMethodUpsertArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereUniqueInputSchema,
  create: z.union([ PaymentMethodCreateInputSchema,PaymentMethodUncheckedCreateInputSchema ]),
  update: z.union([ PaymentMethodUpdateInputSchema,PaymentMethodUncheckedUpdateInputSchema ]),
}).strict() ;

export const PaymentMethodCreateManyArgsSchema: z.ZodType<Prisma.PaymentMethodCreateManyArgs> = z.object({
  data: z.union([ PaymentMethodCreateManyInputSchema,PaymentMethodCreateManyInputSchema.array() ]),
}).strict() ;

export const PaymentMethodCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PaymentMethodCreateManyAndReturnArgs> = z.object({
  data: z.union([ PaymentMethodCreateManyInputSchema,PaymentMethodCreateManyInputSchema.array() ]),
}).strict() ;

export const PaymentMethodDeleteArgsSchema: z.ZodType<Prisma.PaymentMethodDeleteArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  where: PaymentMethodWhereUniqueInputSchema,
}).strict() ;

export const PaymentMethodUpdateArgsSchema: z.ZodType<Prisma.PaymentMethodUpdateArgs> = z.object({
  select: PaymentMethodSelectSchema.optional(),
  include: PaymentMethodIncludeSchema.optional(),
  data: z.union([ PaymentMethodUpdateInputSchema,PaymentMethodUncheckedUpdateInputSchema ]),
  where: PaymentMethodWhereUniqueInputSchema,
}).strict() ;

export const PaymentMethodUpdateManyArgsSchema: z.ZodType<Prisma.PaymentMethodUpdateManyArgs> = z.object({
  data: z.union([ PaymentMethodUpdateManyMutationInputSchema,PaymentMethodUncheckedUpdateManyInputSchema ]),
  where: PaymentMethodWhereInputSchema.optional(),
}).strict() ;

export const PaymentMethodDeleteManyArgsSchema: z.ZodType<Prisma.PaymentMethodDeleteManyArgs> = z.object({
  where: PaymentMethodWhereInputSchema.optional(),
}).strict() ;

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
}).strict() ;

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
  create: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
  update: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
}).strict() ;

export const EventCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EventCreateManyAndReturnArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
}).strict() ;

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> = z.object({
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const ShopFlavorCreateArgsSchema: z.ZodType<Prisma.ShopFlavorCreateArgs> = z.object({
  select: ShopFlavorSelectSchema.optional(),
  include: ShopFlavorIncludeSchema.optional(),
  data: z.union([ ShopFlavorCreateInputSchema,ShopFlavorUncheckedCreateInputSchema ]),
}).strict() ;

export const ShopFlavorUpsertArgsSchema: z.ZodType<Prisma.ShopFlavorUpsertArgs> = z.object({
  select: ShopFlavorSelectSchema.optional(),
  include: ShopFlavorIncludeSchema.optional(),
  where: ShopFlavorWhereUniqueInputSchema,
  create: z.union([ ShopFlavorCreateInputSchema,ShopFlavorUncheckedCreateInputSchema ]),
  update: z.union([ ShopFlavorUpdateInputSchema,ShopFlavorUncheckedUpdateInputSchema ]),
}).strict() ;

export const ShopFlavorCreateManyArgsSchema: z.ZodType<Prisma.ShopFlavorCreateManyArgs> = z.object({
  data: z.union([ ShopFlavorCreateManyInputSchema,ShopFlavorCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopFlavorCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShopFlavorCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShopFlavorCreateManyInputSchema,ShopFlavorCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopFlavorDeleteArgsSchema: z.ZodType<Prisma.ShopFlavorDeleteArgs> = z.object({
  select: ShopFlavorSelectSchema.optional(),
  include: ShopFlavorIncludeSchema.optional(),
  where: ShopFlavorWhereUniqueInputSchema,
}).strict() ;

export const ShopFlavorUpdateArgsSchema: z.ZodType<Prisma.ShopFlavorUpdateArgs> = z.object({
  select: ShopFlavorSelectSchema.optional(),
  include: ShopFlavorIncludeSchema.optional(),
  data: z.union([ ShopFlavorUpdateInputSchema,ShopFlavorUncheckedUpdateInputSchema ]),
  where: ShopFlavorWhereUniqueInputSchema,
}).strict() ;

export const ShopFlavorUpdateManyArgsSchema: z.ZodType<Prisma.ShopFlavorUpdateManyArgs> = z.object({
  data: z.union([ ShopFlavorUpdateManyMutationInputSchema,ShopFlavorUncheckedUpdateManyInputSchema ]),
  where: ShopFlavorWhereInputSchema.optional(),
}).strict() ;

export const ShopFlavorDeleteManyArgsSchema: z.ZodType<Prisma.ShopFlavorDeleteManyArgs> = z.object({
  where: ShopFlavorWhereInputSchema.optional(),
}).strict() ;

export const ShopAtmosphereCreateArgsSchema: z.ZodType<Prisma.ShopAtmosphereCreateArgs> = z.object({
  select: ShopAtmosphereSelectSchema.optional(),
  include: ShopAtmosphereIncludeSchema.optional(),
  data: z.union([ ShopAtmosphereCreateInputSchema,ShopAtmosphereUncheckedCreateInputSchema ]),
}).strict() ;

export const ShopAtmosphereUpsertArgsSchema: z.ZodType<Prisma.ShopAtmosphereUpsertArgs> = z.object({
  select: ShopAtmosphereSelectSchema.optional(),
  include: ShopAtmosphereIncludeSchema.optional(),
  where: ShopAtmosphereWhereUniqueInputSchema,
  create: z.union([ ShopAtmosphereCreateInputSchema,ShopAtmosphereUncheckedCreateInputSchema ]),
  update: z.union([ ShopAtmosphereUpdateInputSchema,ShopAtmosphereUncheckedUpdateInputSchema ]),
}).strict() ;

export const ShopAtmosphereCreateManyArgsSchema: z.ZodType<Prisma.ShopAtmosphereCreateManyArgs> = z.object({
  data: z.union([ ShopAtmosphereCreateManyInputSchema,ShopAtmosphereCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopAtmosphereCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShopAtmosphereCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShopAtmosphereCreateManyInputSchema,ShopAtmosphereCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopAtmosphereDeleteArgsSchema: z.ZodType<Prisma.ShopAtmosphereDeleteArgs> = z.object({
  select: ShopAtmosphereSelectSchema.optional(),
  include: ShopAtmosphereIncludeSchema.optional(),
  where: ShopAtmosphereWhereUniqueInputSchema,
}).strict() ;

export const ShopAtmosphereUpdateArgsSchema: z.ZodType<Prisma.ShopAtmosphereUpdateArgs> = z.object({
  select: ShopAtmosphereSelectSchema.optional(),
  include: ShopAtmosphereIncludeSchema.optional(),
  data: z.union([ ShopAtmosphereUpdateInputSchema,ShopAtmosphereUncheckedUpdateInputSchema ]),
  where: ShopAtmosphereWhereUniqueInputSchema,
}).strict() ;

export const ShopAtmosphereUpdateManyArgsSchema: z.ZodType<Prisma.ShopAtmosphereUpdateManyArgs> = z.object({
  data: z.union([ ShopAtmosphereUpdateManyMutationInputSchema,ShopAtmosphereUncheckedUpdateManyInputSchema ]),
  where: ShopAtmosphereWhereInputSchema.optional(),
}).strict() ;

export const ShopAtmosphereDeleteManyArgsSchema: z.ZodType<Prisma.ShopAtmosphereDeleteManyArgs> = z.object({
  where: ShopAtmosphereWhereInputSchema.optional(),
}).strict() ;

export const ShopHobbyCreateArgsSchema: z.ZodType<Prisma.ShopHobbyCreateArgs> = z.object({
  select: ShopHobbySelectSchema.optional(),
  include: ShopHobbyIncludeSchema.optional(),
  data: z.union([ ShopHobbyCreateInputSchema,ShopHobbyUncheckedCreateInputSchema ]),
}).strict() ;

export const ShopHobbyUpsertArgsSchema: z.ZodType<Prisma.ShopHobbyUpsertArgs> = z.object({
  select: ShopHobbySelectSchema.optional(),
  include: ShopHobbyIncludeSchema.optional(),
  where: ShopHobbyWhereUniqueInputSchema,
  create: z.union([ ShopHobbyCreateInputSchema,ShopHobbyUncheckedCreateInputSchema ]),
  update: z.union([ ShopHobbyUpdateInputSchema,ShopHobbyUncheckedUpdateInputSchema ]),
}).strict() ;

export const ShopHobbyCreateManyArgsSchema: z.ZodType<Prisma.ShopHobbyCreateManyArgs> = z.object({
  data: z.union([ ShopHobbyCreateManyInputSchema,ShopHobbyCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopHobbyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShopHobbyCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShopHobbyCreateManyInputSchema,ShopHobbyCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopHobbyDeleteArgsSchema: z.ZodType<Prisma.ShopHobbyDeleteArgs> = z.object({
  select: ShopHobbySelectSchema.optional(),
  include: ShopHobbyIncludeSchema.optional(),
  where: ShopHobbyWhereUniqueInputSchema,
}).strict() ;

export const ShopHobbyUpdateArgsSchema: z.ZodType<Prisma.ShopHobbyUpdateArgs> = z.object({
  select: ShopHobbySelectSchema.optional(),
  include: ShopHobbyIncludeSchema.optional(),
  data: z.union([ ShopHobbyUpdateInputSchema,ShopHobbyUncheckedUpdateInputSchema ]),
  where: ShopHobbyWhereUniqueInputSchema,
}).strict() ;

export const ShopHobbyUpdateManyArgsSchema: z.ZodType<Prisma.ShopHobbyUpdateManyArgs> = z.object({
  data: z.union([ ShopHobbyUpdateManyMutationInputSchema,ShopHobbyUncheckedUpdateManyInputSchema ]),
  where: ShopHobbyWhereInputSchema.optional(),
}).strict() ;

export const ShopHobbyDeleteManyArgsSchema: z.ZodType<Prisma.ShopHobbyDeleteManyArgs> = z.object({
  where: ShopHobbyWhereInputSchema.optional(),
}).strict() ;

export const ShopPaymentMethodCreateArgsSchema: z.ZodType<Prisma.ShopPaymentMethodCreateArgs> = z.object({
  select: ShopPaymentMethodSelectSchema.optional(),
  include: ShopPaymentMethodIncludeSchema.optional(),
  data: z.union([ ShopPaymentMethodCreateInputSchema,ShopPaymentMethodUncheckedCreateInputSchema ]),
}).strict() ;

export const ShopPaymentMethodUpsertArgsSchema: z.ZodType<Prisma.ShopPaymentMethodUpsertArgs> = z.object({
  select: ShopPaymentMethodSelectSchema.optional(),
  include: ShopPaymentMethodIncludeSchema.optional(),
  where: ShopPaymentMethodWhereUniqueInputSchema,
  create: z.union([ ShopPaymentMethodCreateInputSchema,ShopPaymentMethodUncheckedCreateInputSchema ]),
  update: z.union([ ShopPaymentMethodUpdateInputSchema,ShopPaymentMethodUncheckedUpdateInputSchema ]),
}).strict() ;

export const ShopPaymentMethodCreateManyArgsSchema: z.ZodType<Prisma.ShopPaymentMethodCreateManyArgs> = z.object({
  data: z.union([ ShopPaymentMethodCreateManyInputSchema,ShopPaymentMethodCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopPaymentMethodCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShopPaymentMethodCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShopPaymentMethodCreateManyInputSchema,ShopPaymentMethodCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopPaymentMethodDeleteArgsSchema: z.ZodType<Prisma.ShopPaymentMethodDeleteArgs> = z.object({
  select: ShopPaymentMethodSelectSchema.optional(),
  include: ShopPaymentMethodIncludeSchema.optional(),
  where: ShopPaymentMethodWhereUniqueInputSchema,
}).strict() ;

export const ShopPaymentMethodUpdateArgsSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateArgs> = z.object({
  select: ShopPaymentMethodSelectSchema.optional(),
  include: ShopPaymentMethodIncludeSchema.optional(),
  data: z.union([ ShopPaymentMethodUpdateInputSchema,ShopPaymentMethodUncheckedUpdateInputSchema ]),
  where: ShopPaymentMethodWhereUniqueInputSchema,
}).strict() ;

export const ShopPaymentMethodUpdateManyArgsSchema: z.ZodType<Prisma.ShopPaymentMethodUpdateManyArgs> = z.object({
  data: z.union([ ShopPaymentMethodUpdateManyMutationInputSchema,ShopPaymentMethodUncheckedUpdateManyInputSchema ]),
  where: ShopPaymentMethodWhereInputSchema.optional(),
}).strict() ;

export const ShopPaymentMethodDeleteManyArgsSchema: z.ZodType<Prisma.ShopPaymentMethodDeleteManyArgs> = z.object({
  where: ShopPaymentMethodWhereInputSchema.optional(),
}).strict() ;

export const ShopEventCreateArgsSchema: z.ZodType<Prisma.ShopEventCreateArgs> = z.object({
  select: ShopEventSelectSchema.optional(),
  include: ShopEventIncludeSchema.optional(),
  data: z.union([ ShopEventCreateInputSchema,ShopEventUncheckedCreateInputSchema ]),
}).strict() ;

export const ShopEventUpsertArgsSchema: z.ZodType<Prisma.ShopEventUpsertArgs> = z.object({
  select: ShopEventSelectSchema.optional(),
  include: ShopEventIncludeSchema.optional(),
  where: ShopEventWhereUniqueInputSchema,
  create: z.union([ ShopEventCreateInputSchema,ShopEventUncheckedCreateInputSchema ]),
  update: z.union([ ShopEventUpdateInputSchema,ShopEventUncheckedUpdateInputSchema ]),
}).strict() ;

export const ShopEventCreateManyArgsSchema: z.ZodType<Prisma.ShopEventCreateManyArgs> = z.object({
  data: z.union([ ShopEventCreateManyInputSchema,ShopEventCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopEventCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ShopEventCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShopEventCreateManyInputSchema,ShopEventCreateManyInputSchema.array() ]),
}).strict() ;

export const ShopEventDeleteArgsSchema: z.ZodType<Prisma.ShopEventDeleteArgs> = z.object({
  select: ShopEventSelectSchema.optional(),
  include: ShopEventIncludeSchema.optional(),
  where: ShopEventWhereUniqueInputSchema,
}).strict() ;

export const ShopEventUpdateArgsSchema: z.ZodType<Prisma.ShopEventUpdateArgs> = z.object({
  select: ShopEventSelectSchema.optional(),
  include: ShopEventIncludeSchema.optional(),
  data: z.union([ ShopEventUpdateInputSchema,ShopEventUncheckedUpdateInputSchema ]),
  where: ShopEventWhereUniqueInputSchema,
}).strict() ;

export const ShopEventUpdateManyArgsSchema: z.ZodType<Prisma.ShopEventUpdateManyArgs> = z.object({
  data: z.union([ ShopEventUpdateManyMutationInputSchema,ShopEventUncheckedUpdateManyInputSchema ]),
  where: ShopEventWhereInputSchema.optional(),
}).strict() ;

export const ShopEventDeleteManyArgsSchema: z.ZodType<Prisma.ShopEventDeleteManyArgs> = z.object({
  where: ShopEventWhereInputSchema.optional(),
}).strict() ;

export const ReviewCreateArgsSchema: z.ZodType<Prisma.ReviewCreateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  data: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
}).strict() ;

export const ReviewUpsertArgsSchema: z.ZodType<Prisma.ReviewUpsertArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
  create: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
  update: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReviewCreateManyArgsSchema: z.ZodType<Prisma.ReviewCreateManyArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
}).strict() ;

export const ReviewCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReviewCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
}).strict() ;

export const ReviewDeleteArgsSchema: z.ZodType<Prisma.ReviewDeleteArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewUpdateArgsSchema: z.ZodType<Prisma.ReviewUpdateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  data: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewUpdateManyArgsSchema: z.ZodType<Prisma.ReviewUpdateManyArgs> = z.object({
  data: z.union([ ReviewUpdateManyMutationInputSchema,ReviewUncheckedUpdateManyInputSchema ]),
  where: ReviewWhereInputSchema.optional(),
}).strict() ;

export const ReviewDeleteManyArgsSchema: z.ZodType<Prisma.ReviewDeleteManyArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
}).strict() ;