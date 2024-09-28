import admin from "firebase-admin"; // 使用 Firebase Admin SDK


// 初始化 Firebase Admin SDK，從環境變數讀取憑證
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "react-908cf",
    clientEmail: "firebase-adminsdk-71414@react-908cf.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLhoo2dWCFbhJI\nx28bA9II/vjHZpbb4yx5eLKQhXQf/JZFOQd+zy8uZBcQIHI0v87ZBSOlJF5egotC\nX6EHCfLTuUNFy3IRSbwkebnb7r8D3IM1VdTcurf3suvgEVX4Hr6fUg70hg7rG2Cf\nf1/Ev1Wtxj7IxZwbXNvxkEeKre28ZA2aSBWmjhrlrnjlmuG1rkzwtkV6RiBL7ChR\nXd8sDa2LbB1HNt2Xa9XNePUTeglhjYt3u5Vab7F8nMbuaq9BVOnrXU4NoOrjrkP1\nXVsfxJZpMgeKh2OSXaRgnaKPNTebDi9wYlM6/tDKOnxh9tDTILD1pn5xMoBu19Uh\nG4iHkKg7AgMBAAECggEAHYu4gNNlYblq+hnJrVhOo3OwVfI0sFM4X6H/+i8FfqdC\ngWYYCna1WLy7BGJRcgruUl8Gn7C56mp1IPuU+tqc39OjSnyQYKYdpAXvz1fHbx4S\nBiohrrGEh3b3+x1JJ63+6k4VUbYscEEXM9Bf7MYCACopbygQ04AVhen2GNHLE3AI\nqV24qjwvM8EDn9jR8fTpIuy0zX8ev1XyDIHTTkLMQSkmWZmdslGfi4eP5tnJHKjQ\n3XGonP2eBu2VJzy493oPiTxSCoFpiL/CSAcA5uahCZqmc3I4dl+tlXZqwOd+TEst\nV//NzceMuqviCGCCq3NnyG+M1MyVFwj54KoZ+4h+MQKBgQDnzDJBXnJf3T+CF2eA\nDakLfAARnPQGxiaC1/GUpI/QlYoExg7Vb+HmJf4FsJF0ESMb7vPxng89hn65FITP\ntHFWEdQQm5CA00bBC5tqtvo+6KNXKoXgR97+sHnJHZm01i7dHikN+Emiba/4QxIE\n+eauu7JkKihPmhIyNGZimpiynwKBgQDgxqX/+yEglZXjrYXVEcxzdHJnCZzlhkqk\nEBwOryadTEXh+CSpEHhlXxGUbVttJ+UKPyVwN43YhxtOrTwGuP1vfUzg6iQcFMhM\nMEZoXdMdiWQ6I9J7Co7mjwskbUurkR20EnmxYxF1+99BptEgH+JdLcFf2fjB7YZ8\ngpWKhDsg5QKBgDfLaAFiGYfHusS2m3wwTZNtGpsiu35x7c0q64SLA+8CP8GcZu+r\nSaXbWUTHVouooFnV77QmBqcZm6EzNjDEz08XZYNF3seTk4FeKN/MAXppBwAxRR5S\nTnPhyL7HODtWHtusqdcp/5dwbZ4Fju3RtVwz4+HGYAOhI2YgRNDRQ5YjAoGBANEO\nsXImBieiOOiriWAkz71KPuUqgazQfDefbBkUOpvuRsjm3GIKGZBfHaCpHXGmu1YO\naSm34cvTzUgdw0iVYdIB/jDqVG9xvOFvvOxw51v/XyLcEnWx2jsCK+DTbp/Btpi2\n3kxn0eOkQX90QejY/tafKc2Wk9D6tCy135QXbE8pAoGAYGOjdhyXdNrVXkCH/QrC\nfNJBqm5ZJLuVxpu9sY+5BkNFVogTfvCpAeQv0sxCQaeP2ITEvyebrs5KRYW0MqjV\nBK71xYcueutkCk0U99uAb0gvx6D826JIPAbTc1xt1LBTuUsnIGTpNe/YxWbHR8F4\nphGWv+Rol7T0UNv0okuBmGs=\n-----END PRIVATE KEY-----\n",
  }),
});

// 初始化 Firestore 資料庫
const db = admin.firestore();

// 確認 Firestore 已正確初始化
// console.log("Firestore initialized:", db);

export default db;
