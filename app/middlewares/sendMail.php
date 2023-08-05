<?php
// Récupère les données envoyées par le formulaire
$userName = $_POST['userName'];
$mail = $_POST['mail'];
$message = $_POST['message'];

// Prépare l'e-mail à envoyer
$to = "alexandre.richard.dev@gmail.com";
$subject = "Nouveau message de $userName";
$body = "Nom : $name\nE-mail : $mail\nMessage : $message";
$headers = "From: $mail";

// Envoie l'e-mail
if (mail($to, $subject, $body, $headers)) {
  echo "E-mail envoyé avec succès !";
} else {
  echo "Erreur lors de l'envoi de l'e-mail";
}
?>