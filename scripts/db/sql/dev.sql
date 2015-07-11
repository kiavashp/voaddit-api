INSERT INTO `user` (`username`, `password`, `email`) VALUES
('shaheen', '123', 'shaheenspage@gmail.com'),
('other_user', '123', NULL);

INSERT INTO `community` (`name`, `description`, `iduser_fk`) VALUES
('this-community', 'This Community', 1),
('that-community', 'That Community', 2);

INSERT INTO `post` (`title`, `content_url`, `iduser_fk`, `idcommunity_fk`) VALUES
('this-post', 'https://example.com/this/post', 1, 1),
('that-post', 'https://example.com/that/post', 2, 2);
