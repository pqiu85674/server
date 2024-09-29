const { MERCHANTID, HASHKEY, HASHIV } = process.env;

const options = {
  merchantInfo: {
    merchantID: MERCHANTID,
    hashKey: HASHKEY,
    hashIV: HASHIV,
  },
};

export default options;
