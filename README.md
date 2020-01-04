# Тестовое задание в Aviasales

Задание: [github.com/KosyanMedia/test-tasks/tree/master/aviasales_frontend](https://github.com/KosyanMedia/test-tasks/tree/master/aviasales_frontend)

Сетап проекта сделан на [Create React App](https://create-react-app.dev), использует [RxJS](https://rxjs.dev) для загрузки данных.

Сделал несколько допущений:
- когда сервер бросает ошибку, делаю 3 попытки и, если снова не получилось, показываю ошибку;
- сортировка «самый быстрый» делаю по суммарной длительности туда и обратно;
- билеты показываются по мере загрузки, пока загрузка продолжается показываю лоадер;
- на мобилках просто выстраиваю всё в одну колонку.
