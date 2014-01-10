<?php

/* Newsletter - newsletter.php */

/* trace HTML Template  */
/* author: entiri s.r.o.*/

/* load configuration */
require_once('config.php');

/* Processing newsletter form with trivial spam protection */
if (isset($_POST['newsletter']) && empty($_POST['robot'])) {
	
	$errors = array();
	$guest_email   = strip_tags($_POST['newsletter']);

	// E-mail validation
	if( !filter_var($guest_email, FILTER_VALIDATE_EMAIL) ) {
		$errors['email'] = 'You have entered an incorrect e-mail address.';
	}

	// Send an e-mail
	if (!$errors) {
		$subject = 'New newsletter member: '.$guest_email;
		$message = 'Congratulations, you have new newsletter recipient "'.$guest_email.'" at http://'.$_SERVER['HTTP_HOST'];
		
		$headers   = array();
		$headers[] = "MIME-Version: 1.0";
		$headers[] = "Content-type: text/plain; charset=utf-8";
		$headers[] = "From: ". $guest_email;
		$headers[] = "Reply-To: ". $guest_email;
		$headers[] = "X-Mailer: PHP/".phpversion();

		if (@mail($email_address, $subject, $message, implode("\r\n", $headers))) {
			$output['status'] = 1;
		} else {
			$errors['system'] = 'An error has occurred.';
		}
	} 

	// Errors message will be displayed
	$output['errors'] = implode($errors,'<br />');

	// json print of output
	die(json_encode($output));
}

/* Location: php/newsletter.php */
?>