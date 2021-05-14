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

//найти юзера из сессии айди

//добавить в реквест. req.auts.userId
//установить время жизни сессии

export default session;
