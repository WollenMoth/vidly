insert into
    api_genre (id, name)
values
    (1, 'Comedy'),
    (2, 'Action'),
    (3, 'Romance'),
    (4, 'Thriller');

insert into
    api_movie (id, title, numberInStock, dailyRentalRate, genre_id, liked)
values
    (1, 'Airplane', 5, 2, 1, false),
    (2, 'The Hangover', 10, 2, 1, false),
    (3, 'Wedding Crashers', 15, 2, 1, false),
    (4, 'Die Hard', 5, 2, 2, false),
    (5, 'Terminator', 10, 2, 2, false),
    (6, 'The Avengers', 15, 2, 2, false),
    (7, 'The Notebook', 5, 2, 3, false),
    (8, 'When Harry Met Sally', 10, 2, 3, false),
    (9, 'Pretty Woman', 15, 2, 3, false),
    (10, 'The Sixth Sense', 5, 2, 4, false),
    (11, 'Gone Girl', 10, 2, 4, false),
    (12, 'The Others', 15, 2, 4, false);