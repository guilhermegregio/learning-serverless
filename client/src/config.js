export default {
  apiGateway: {
    URL: "https://api.thegregio.com/v1",
    REGION: "us-east-1"
  },
  s3: {
    BUCKET: "notes-app-uploads-gregio"
  },
  cognito: {
    USER_POOL_ID: "us-east-1_L2LvCth0S",
    APP_CLIENT_ID: "6asemtmmunh7gkvk323jgflu0m",
    MAX_ATTACHMENT_SIZE: 5000000,
    REGION: "us-east-1",
    IDENTITY_POOL_ID: "us-east-1:8dfcbd19-f000-411c-876c-77aea9bcee14"
  }
};