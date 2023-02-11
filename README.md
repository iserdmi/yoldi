## Вопросы, которые я бы задал, если бы делал это бок о бок с командой.

- Должна ли страница личного профиля быть по адресу /my-profile, или пусть она открывается по всеобщему пути /[slug]? В общем, сделал заготовку под оба варианта, но сейчас открываю по /[slug]. Зависит от бизнес требований, в общем.
- Должна ли на мобилке страница редактирования профиля быть также модалкой, или пусть на мобилке это будет именно отдельаная страница, а на десктопе модальник? Сейчас сделал везде модальник, но поправить не долго.
- Могут ли бэкендеры открыть доступ к схеме их апи в формате JSON, чтобы я мог нагенерировать TS типы для фронта, а не писать их руками?
- Могут ли бэкендеры, пожалуйста, при регистрации и входе также возвращать и пользователя? Не хочется ещё один запрос делать на бэкенд

## Что я такого сделал, чего не просили (согласно дизайну), но что по-моему хорошо

-

## Баг бэкенда

Текущее поведение:

- Авторизуемся под любым пользователем.
- Редактируем профиль и указываем слаг к примеру "xxx--example.com"
- Разлогиниваемся
- Регистрируемся под почтой xxx@example.com
- Получаем Internal Server Error

Ожидаемое поведение:

- Создастся пользователь без ошибки, а его slug будет к примеру "xxx--example.com1"

## TODO

- reactCookies
- Add PrettyText
- Add Toast
- Add eslint
- Add husky
- Images upload
- Deploy
