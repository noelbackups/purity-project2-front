<?php

namespace API\Service;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
    private $Mail;

    public function __construct()
    {
        $this->Mail = new PHPMailer(true);

        $this->Mail->isSMTP();                                            //Send using SMTP
        $this->Mail->Host       = 'mail.purityoficial.com';                  //Set the SMTP server to send through
        $this->Mail->Username   = 'checkout@purityoficial.com';  //SMTP username
        $this->Mail->Password   = 'piM?U4u1+)-6';                         //SMTP password             
        $this->Mail->CharSet    = "UTF-8";
        $this->Mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $this->Mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $this->Mail->Port       = 465;

        $this->Mail->setFrom('checkout@purityoficial.com', 'Purity Checkout');
        $this->Mail->isHTML(true);                                  //Set email format to HTML
    }

    public function addAddress($address)
    {
        $this->Mail->addAddress($address);     //Add a recipient
    }

    public function addContent($Subject, $Message)
    {
        $this->Mail->Subject = $Subject;
        $this->Mail->Body    = $Message;
    }

    public function addFile($File)
    {
        $this->Mail->addAttachment($File);
    }

    public function addFileUrl($url, $fileName)
    {
        $this->Mail->addStringAttachment(file_get_contents($url), $fileName);
    }

    public function getErrorMessage()
    {
        return $this->Mail->ErrorInfo;
    }

    public function send()
    {
        $this->Mail->send();
    }
}
