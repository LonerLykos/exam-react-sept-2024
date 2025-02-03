Про проект

Проект реалізовано через збереження даних в сессійному сховищі так як дані, що надає АПІ, є статичні. Ідея виникла після ознайомлення з документацією https://dummyjson.com, яка не надає можливості фільтрувати рецепти за id користувача.

Для роботи з проектом потрібно пройти логінацію яка реалізована через селекти для спрощення входу. Надано 2 різних варіанти для можливості перевірки помилки на “невірно введені дані”. Обидва варіанти є валідними, помилка генерується перехресним вибором (користувач 1 + пароль 2, або користувач 2 + пароль 1).

Після логінації Вас повертає на головну сторінку, розблоковується меню і можна працювати з сайтом. Також під час логінації ви отримуєте інформацію про користувача і токени. Якщо поточний access токен  застарів його заміна відбувається автоматично, якщо за якихось причин цього не сталось Вас буде розлогінено і повернено на сторінку логінації.

На сайті згідно з ТЗ реалізовані сторінки “користувачів” та “рецептів” з короткою та детальною інформацією про кожен. Загальні сторінки з інформацією (+сторінка фільтрації) містять пагінацію, яка реалізована на пагінуванні готових даних які завчасно отримані з АПІ при відвідуванні певної сторінки або при спрацюванні додаткової умови.

У деяких користувачів в детальній інформації можна знайти створені ними рецепти. Кожна назва це посилання на сторінку з детальною інформацією на конкретний рецепт. Кожен рецепт на сторінці з детальною інформацією містить  вказівник на користувача який його створив, що являє собою посилання на детальну інформацію по конкретному користувачу.

На сайті створено пошук який активний виключно на загальних сторінках користувачів або рецептів і пошук там відбувається відповідно. Шукати можливо як за назвою так і за порядковим номером(ідентифікатором).

Крім того, загальний список рецептів має активні посилання на тегах, при кліці на який вас перенесе на відповідну сторінку фільтрації по тегах.

Це проект React + TypeScript + Vite 