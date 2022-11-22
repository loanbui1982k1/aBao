use funmath;

-- trigger
CREATE TRIGGER `update_exp` AFTER UPDATE ON `course_users`
 FOR EACH ROW UPDATE users SET total_exp = total_exp + new.total_exp - old.total_exp WHERE username = new.username;

CREATE TRIGGER `addQuestion` AFTER INSERT ON `questions` FOR EACH ROW UPDATE chapters 
SET question_all_count = question_all_count + 1 WHERE chapter_id = new.chapter_id;

CREATE TRIGGER `addQuestionCourse` AFTER UPDATE ON `chapters` FOR EACH ROW UPDATE courses 
SET question_all_count = question_all_count + new.question_all_count - old.question_all_count 
WHERE course_id = new.course_id;

CREATE TRIGGER `deleteQuestion` AFTER DELETE ON `questions` FOR EACH ROW UPDATE chapters 
SET question_all_count = question_all_count - 1 WHERE chapter_id = old.chapter_id;

CREATE TRIGGER `deleteChapter_user` AFTER DELETE ON `chapters`
 FOR EACH ROW DELETE from chapter_users WHERE chapter_id = old.chapter_id;

 CREATE TRIGGER `deleteChapter` AFTER DELETE ON `chapters`
 FOR EACH ROW DELETE from questions WHERE chapter_id = old.chapter_id;

 CREATE TRIGGER `deleteMultiChoice` AFTER DELETE ON `questions`
 FOR EACH ROW DELETE from multichoice_questions WHERE question_id = old.question_id;

 CREATE TRIGGER `deleteTypeQuestion` AFTER DELETE ON `questions`
 FOR EACH ROW DELETE from type_questions WHERE question_id = old.question_id;

 CREATE TRIGGER `deleteCourse` AFTER DELETE ON `courses`
 FOR EACH ROW DELETE from chapters WHERE course_id = old.course_id;

 CREATE TRIGGER `deleteCourse_User` AFTER UPDATE ON `courses`
 FOR EACH ROW DELETE from course_users WHERE course_id = old.course_id;

 CREATE TRIGGER `insertChapter` AFTER INSERT ON `chapters`
 FOR EACH ROW UPDATE course_users set is_done = 0 WHERE course_id = new.course_id;

-- Course
INSERT INTO courses (course_id, course_name, question_all_count)
VALUES (1, "Phép cộng", 0);

INSERT INTO courses (course_id, course_name, question_all_count)
VALUES (2, "Phép trừ", 0);

INSERT INTO courses (course_id, course_name, question_all_count)
VALUES (3, "Phép nhân", 0);

INSERT INTO courses (course_id, course_name, question_all_count)
VALUES (4, "Phép chia", 0);

-- Chapter
INSERT INTO chapters (chapter_id, chapter_name, question_all_count, course_id)
VALUES (1, "Chương 1", 5, 1);

INSERT INTO chapters (chapter_id, chapter_name, question_all_count, course_id)
VALUES (2, "Chương 2", 0, 1);


-- User

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("binhdang", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Đặng Thị Bình", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/binhdang?alt=media&token=5f798c1f-4e0c-478d-bb35-1e7af7e9b416", 
 1,0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("loanbui", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Bùi Thị Út Loan", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/loanbui?alt=media&token=d9f39c37-dc5a-4c54-96e0-7112c207fb80", 
 1, 0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("maihoa", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Đặng Thị Thanh Hoa", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/maihoa?alt=media&token=4f162103-a54d-4142-ae02-c10ba03c6b8b", 
 1, 0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("maihuy", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Trịnh Mai Huy", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/defaultProfileImage.png?alt=media&token=790800d6-aac7-4359-a541-e73b3348e3cb", 
 1, 0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("minhhuong", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", 0, "Lê Minh Hương", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/minhhuong?alt=media&token=8093454e-5977-4271-b43d-9d89ccabb4e7", 
 1, 0, false, false);

INSERT INTO users (username, password, role_id, name, profile_photo_path, current_course_id, total_exp, is_new_course_noti, is_new_chapter_noti)
VALUES ("admin", "$2b$10$oBJRzu3lSpfo0m711zMGgeeJF3g/CbEHS.dY0IbyqYtMFUvMzAKXy", "1", "Admin", 
"https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/defaultProfileImage.png?alt=media&token=790800d6-aac7-4359-a541-e73b3348e3cb", 
 1, 0, false, false);


-- Chapter_User

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (1, false, "binhdang");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (2, false, "binhdang");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (1, false, "loanbui");

INSERT INTO chapter_users (chapter_id, is_done, username)
VALUES (2, false, "loanbui");


-- Course_User
INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (1, "binhdang", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (2, "binhdang", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (3, "binhdang", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (4, "binhdang", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (1, "loanbui", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (2, "loanbui", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (3, "loanbui", 1, 0, False, 0);

INSERT INTO course_users (course_id, username, current_chapter, question_learnt_count, is_done, total_exp)
VALUES (4, "loanbui", 1, 0, False, 0);



-- Questions 

insert into questions (question_name, chapter_id, question_image) values ("1 + 1", 1, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/1%20%2B%201%20%3D%202%20-%20Study.png?alt=media&token=0ebb644a-56ed-44c3-b097-a896dd6df0da');
insert into questions (question_name, chapter_id, question_image) values ("1 + 2", 1, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/1%20%2B%202%20%3D%203%20-%20Study.png?alt=media&token=38ced61f-f752-405b-a78b-b17dbc105720');
insert into questions (question_name, chapter_id, question_image) values ("2 + 1", 1, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/2%20%2B%201%20%3D%203%20-%20Study.png?alt=media&token=41ae601c-b87d-4066-bce1-20cb4b4da467');
insert into questions (question_name, chapter_id, question_image) values ("2 + 2", 1, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/2%20%2B%202%20%3D%204%20-%20Study.png?alt=media&token=172a6d1e-66b1-48d5-9dc5-2c12fc2fbae8');
insert into questions (question_name, chapter_id, question_image) values ("1 + 3", 2, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/1%20%2B%203%20%3D%204%20-%20Study.png?alt=media&token=44e0186e-60b3-4830-b57e-6c6d1490ecf8');
insert into questions (question_name, chapter_id, question_image) values ("3 + 1", 2, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/3%20%2B%201%20%3D%204%20-%20Study.png?alt=media&token=015ad89f-c10b-4a39-94e6-93005bd345a4');
insert into questions (question_name, chapter_id, question_image) values ("1 + 4", 2, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/1%20%2B%204%20%3D%205%20-%20Study.png?alt=media&token=2b900a95-3a67-4cfa-9361-4fac3635c2bf');
insert into questions (question_name, chapter_id, question_image) values ("4 + 1", 2, 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/4%20%2B%201%20%3D%205%20-%20Study.png?alt=media&token=d603ee2f-e0c3-433c-92b7-ff53fb32950d');


-- Mutliple choice

insert into multichoice_questions (question, correct_answer, answers, format_question, question_image, question_id) values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 1, "1,2,3,4", "1+?=2", 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/1%20%2B%201%20%3D%202%20-%20Question.png?alt=media&token=f5d943f9-0145-46b9-baae-6f486f5161e7',1);

insert into multichoice_questions (question, correct_answer, answers, format_question, question_image,question_id) values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 2, "1,2,3,4", "1+?=3", 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/1%20%2B%202%20%3D%203%20-%20Question.png?alt=media&token=3d134d86-14a4-4230-983b-a4e7c70408e3',2);

insert into multichoice_questions (question, correct_answer, answers, format_question, question_image,question_id) values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 1, "1,2,3,4", "2+?=3",'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/2%20%2B%201%20%3D%203%20-%20Question.png?alt=media&token=51037f2a-d6a6-4af5-8a1b-26bf9ab3b06e', 3);

insert into multichoice_questions (question, correct_answer, answers, format_question, question_image,question_id) values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 2, "1,2,3,0", "2+?=4", 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/2%20%2B%202%20%3D%204%20-%20Question.png?alt=media&token=101863b6-749d-46e6-84da-8bc93687dcb0',4);

insert into multichoice_questions (question, correct_answer, answers, format_question, question_image, question_id) values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 3, "1,2,3,4", "1+?=4", 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/1%20%2B%203%20%3D%204%20-%20Question.png?alt=media&token=c7124dd3-4a0b-4df5-95fa-32b1890f36a3',5);

insert into multichoice_questions (question, correct_answer, answers, format_question, question_image,question_id) values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 1, "1,2,3,4", "3+?=4", 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/3%20%2B%201%20%3D%204%20-%20Question.png?alt=media&token=f66f6f86-7005-46e7-8d5e-700a5e1ffa42',6);

insert into multichoice_questions (question, correct_answer, answers, format_question, question_image,question_id) values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 4, "1,2,3,4", "1+?=5",'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/1%20%2B%204%20%3D%205%20-%20Question.png?alt=media&token=b15f57d5-9bc0-4489-87d3-c03d6d4e4072', 7);

insert into multichoice_questions (question, correct_answer, answers, format_question, question_image,question_id) values ("Điền số nấm còn thiếu giúp bạn chó nhé!", 1, "1,2,3,0", "4+?=5", 'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/4%20%2B%201%20%3D%205%20-%20Question.png?alt=media&token=5c228a06-4874-4231-ab47-37429c2d6470',8);

-- type question

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Loan có 1 cái kẹo, Bình cho Loan thêm 1 cái nữa. Hỏi Loan có mấy cái kẹo?', '1', '1+?=2', 'Đọc và hoàn thành phép toán', 1);

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Loan có 1 cái kẹo, Bình cho Loan thêm 2 cái nữa. Hỏi Loan có mấy cái kẹo?', '2,3', '1+?=?', 'Đọc và hoàn thành phép toán', 2);

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Huy có 2 cái kẹo, Bình cho Huy thêm 1 cái nữa. Hỏi Huy có mấy cái kẹo?', '2', '?+1=3', 'Đọc và hoàn thành phép toán', 3);

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Huy có 2 cái kẹo, Bình cho Huy thêm 2 cái nữa. Hỏi Huy có mấy cái kẹo?', '2,4', '?+2=?', 'Đọc và hoàn thành phép toán', 4);

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Loan có 1 cái kẹo, Huy cho Loan thêm 3 cái nữa. Hỏi Loan có mấy cái kẹo?', '4', '1+3=?', 'Đọc và hoàn thành phép toán', 5);

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Loan có 3 cái kẹo, Bình cho Loan thêm 1 cái nữa. Hỏi Loan có mấy cái kẹo?', '1,4', '3+?=?', 'Đọc và hoàn thành phép toán', 6);

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Huy có 1 cái kẹo, Bình cho Huy thêm 4 cái nữa. Hỏi Huy có mấy cái kẹo?', '1', '?+4=5', 'Đọc và hoàn thành phép toán', 7);

INSERT INTO `type_questions`( `question`, `correct_answer`, `format_question`, `question_name` ,`question_id`) VALUES ('Huy có 4 cái kẹo, Bình cho Huy thêm 1 cái nữa. Hỏi Huy có mấy cái kẹo?', '4,5', '?+1=?', 'Đọc và hoàn thành phép toán', 8);

