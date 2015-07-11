INSERT INTO `user` (`username`, `password`, `email`) VALUES
('test1', '123', 'test1@gmail.com'),
('test2', '123', 'test2@yahoo.com'),
('test3', '123', NULL);

INSERT INTO `community` (`name`, `description`, `iduser_fk`) VALUES
('this-community', 'This Community', 1),
('that-community', 'That Community', 2),
('other-community', 'Other Community', 3),
('another-community', NULL, 1);

INSERT INTO `post` (`title`, `content_url`, `iduser_fk`, `idcommunity_fk`) VALUES
('this-post', 'https://example.com/this/post', 1, 1),
('that-post', 'https://example.com/that/post', 2, 2),
('other-post', 'https://example.com/other/post', 3, 3),
('another-post', 'https://example.com/another/post', 1, 4);
