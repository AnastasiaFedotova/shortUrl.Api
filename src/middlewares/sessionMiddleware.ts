import service from './../service/authorizeService'

const session = async function (req, _res, next): Promise<void> {
  try {
    const sessionId = req.cookies.session;
    const userId = await service.findUserId(sessionId);

    req.auts = {
      userId: userId
    };

    console.log('LOGGED');
    next();
  } catch (err) {
    console.log(err);
  }
}

export default session;
