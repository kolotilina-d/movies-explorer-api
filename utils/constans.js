module.exports.urlRegexp = /^https?:\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,})?(?:[/?#]\S*)?$/;

module.exports.MONGODB = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports.INTERNAL_SERVER_ERROR = 'Внутренняя ошибка сервера';

module.exports.UNAUTHORIZED_ERROR = 'Необходима аторизация';

module.exports.BAD_REQUEST = 'Некорректный запрос';

module.exports.FORBIDDEN_ERROR = 'Недостаточно прав доступа';

module.exports.NOT_FOUND = 'Сервер не может найти данные согласно запросу';

module.exports.CONFLICT_ERROR = 'Конфликтное обращение';
