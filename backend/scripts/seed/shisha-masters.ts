/**
 * シーシャ関連マスターデータのシードデータ
 * フレーバー、雰囲気、ホビー、支払い方法、イベント
 */
import { PrismaClient } from "@prisma/client";

export async function seedShishaMasters(prisma: PrismaClient) {
  console.log("🎨 シーシャマスターデータを作成中...");

  // フレーバーマスタデータを作成
  const flavors = [
    "アップル",
    "グレープ",
    "ミント",
    "レモン",
    "オレンジ",
    "ストロベリー",
    "ピーチ",
    "チェリー",
    "バナナ",
    "ブルーベリー",
    "パイナップル",
    "マンゴー",
    "ココナッツ",
    "バニラ",
    "チョコレート",
    "コーヒー",
    "ローズ",
    "ジャスミン",
    "ラベンダー",
    "カルダモン",
    "シナモン",
    "ガム",
    "ミルク",
    "ハニー",
    "グレープフルーツ",
  ];

  const createdFlavors = await Promise.all(
    flavors.map((name) =>
      prisma.flavor.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  console.log(`✅ ${createdFlavors.length}種類のフレーバーを作成しました`);

  // 雰囲気マスタデータを作成
  const atmospheres = [
    "味重視",
    "映え重視",
    "お酒重視",
    "まったり",
    "ワイワイ",
    "デート向き",
    "一人時間",
    "勉強・作業",
    "おしゃべり",
    "高級感",
    "カジュアル",
    "アットホーム",
    "スタイリッシュ",
    "隠れ家",
  ];

  const createdAtmospheres = await Promise.all(
    atmospheres.map((name) =>
      prisma.atmosphere.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  console.log(`✅ ${createdAtmospheres.length}種類の雰囲気を作成しました`);

  // ホビーマスタデータを作成
  const hobbies = [
    "ジェンガ",
    "ダーツ",
    "ビリヤード",
    "カラオケ",
    "ボードゲーム",
    "トランプ",
    "UNO",
    "オセロ",
    "チェス",
    "マージャン",
    "テレビゲーム",
    "Netflix鑑賞",
    "音楽鑑賞",
    "読書スペース",
  ];

  const createdHobbies = await Promise.all(
    hobbies.map((name) =>
      prisma.hobby.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  console.log(`✅ ${createdHobbies.length}種類のホビーを作成しました`);

  // 支払い方法マスタデータを作成
  const paymentMethods = [
    "現金",
    "Visa",
    "Mastercard",
    "JCB",
    "American Express",
    "PayPay",
    "LINE Pay",
    "メルペイ",
    "d払い",
    "au PAY",
    "Suica",
    "PASMO",
    "nanaco",
    "WAON",
    "楽天Edy",
    "楽天Pay",
    "Apple Pay",
    "Google Pay",
    "QUICPay",
    "iD",
  ];

  const createdPaymentMethods = await Promise.all(
    paymentMethods.map((name) =>
      prisma.paymentMethod.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  console.log(
    `✅ ${createdPaymentMethods.length}種類の支払い方法を作成しました`
  );

  // イベントマスタデータを作成
  const events = [
    {
      name: "DJナイト",
      description: "DJによる音楽イベント",
      schedule: "毎週金曜日",
    },
    {
      name: "コスプレデー",
      description: "コスプレでの来店で割引",
      schedule: "毎月第2土曜日",
    },
    {
      name: "レディースデー",
      description: "女性限定割引",
      schedule: "毎週水曜日",
    },
    {
      name: "メンズデー",
      description: "男性限定割引",
      schedule: "毎週月曜日",
    },
    {
      name: "カップル割引",
      description: "カップルでの来店で割引",
      schedule: "毎日",
    },
    {
      name: "学割デー",
      description: "学生証提示で割引",
      schedule: "平日限定",
    },
    {
      name: "ハッピーアワー",
      description: "時間限定割引",
      schedule: "18:00-20:00",
    },
    {
      name: "ベリーダンスショー",
      description: "ベリーダンスパフォーマンス",
      schedule: "毎月第1日曜日",
    },
  ];

  const createdEvents = [];
  for (const event of events) {
    const existingEvent = await prisma.event.findFirst({
      where: { name: event.name },
    });

    if (existingEvent) {
      const updated = await prisma.event.update({
        where: { id: existingEvent.id },
        data: event,
      });
      createdEvents.push(updated);
    } else {
      const created = await prisma.event.create({
        data: event,
      });
      createdEvents.push(created);
    }
  }

  console.log(`✅ ${createdEvents.length}種類のイベントを作成しました`);

  return {
    flavors: createdFlavors,
    atmospheres: createdAtmospheres,
    hobbies: createdHobbies,
    paymentMethods: createdPaymentMethods,
    events: createdEvents,
  };
}
