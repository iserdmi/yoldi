## Вопросы, которые я бы задал, если бы делал это бок о бок с командой.

- Должна ли страница личного профиля быть по адресу /my-profile, или пусть она открывается по всеобщему пути /[slug]? В общем, сделал заготовку под оба варианта, но сейчас открываю по /[slug]. Зависит от бизнес требований, в общем.
- Должна ли на мобилке страница редактирования профиля быть также модалкой, или пусть на мобилке это будет именно отдельаная страница, а на десктопе модальник? Сейчас сделал везде модальник, но поправить не долго.
- Могут ли бэкендеры открыть доступ к схеме их апи в формате JSON, чтобы я мог нагенерировать TS типы для фронта, а не писать их руками?
- Могут ли бэкендеры, пожалуйста, при регистрации и входе также возвращать и пользователя? Не хочется ещё один запрос делать на бэкенд
- Я создал scss миксины и переменные исходя из того, как они были определены в дизайне и использовал в тех же местах. Однакто там такое дело, что есть к примеру переменная цвета $txt-color и она где-то используется дл определения цвета текста, что логично, а где-то может быть и цветом фона, и цветом бэкграунда. И много таких переменных вроде бы не семантически использующих. Я бы обсудил это с дизайнером, и было бы вообще здорво в макетах иметь блок с китом, где были прописаны все переменные и миксины, так было бы и мне проще, и дизайнеру прощу. Впрочем я думаю, что вы так и делаете, просто в этом тестовом задании не предоставили.
- Почему везде паддинг с бока на мобилке 30 пикселей, а вот на странице со списком пользователей 20 пикселей? Это стратегия (там реально нужен меньший паддинг) или недочёт? Если что я всё это пишу без претензии, просто рассказываю, что хотелось бы обсудить
- Предлагаю на бэкенде сделать PATCH /api/profile принимающим параметры опциональано. Чтобы можно было передать только то, что меняешь и это работало. Если хотим сброить какое-то значение передаём null. А то вот я аватар загружаю, а прихдится доставать все прочие поля и мержить с полем аватара. Причём почему-то обязателдьными являются только name и slug сейчас, остальные если не передать, то ошибк не будут, и они не изменятся, как и хотелось бы. В общем тут какое-то не однозначное повоедение у этого эндпоинта.

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

- Images upload
- Deploy
