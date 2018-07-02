<?php
    $msg_box = ""; // в этой переменной будем хранить сообщения формы
    $errors = array(); // контейнер для ошибок
    // проверяем корректность полей
    if($_POST['user_tel'] == "") $errors[] = "Поле 'Ваш EMAIL' не заполнено!";

    // если форма без ошибок
    if(empty($errors)){     
        $er = 0;
        // собираем данные из формы
        $message .= "EMAIL пользователя: " . $_POST['user_tel'];      
        send_mail($message); // отправим письмо
        // выведем сообщение об успехе
        $msg_box = "<span style='color: #29e029;'>Спасибо! Ваша заявка получена!</span>";
        
    }else{
        $er = 1;
        // если были ошибки, то выводим их
        $msg_box = "";
        foreach($errors as $one_error){
            $msg_box .= "<span style='color: #b90000;'>$one_error</span><br/>";
        }
    }

    // делаем ответ на клиентскую часть в формате JSON
    echo json_encode(array(
        'result' => $msg_box,
        'er'    => $er
    ));
    
    
    // функция отправки письма
    function send_mail($message){
        // почта, на которую придет письмо
        $mail_to = "boiler-vulkan@yandex.ru"; 
        // тема письма
        $subject = "=?UTF-8?B?" . base64_encode("Новая заявка на обратный звонок") . "?=";
        
        // заголовок письма
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: Отправитель <boiler-vulkan@yandex.ru>\r\n"; //Наименование и почта отправителя
        
        // отправляем письмо 
        mail($mail_to, $subject, $message, $headers);
    }
    
?>