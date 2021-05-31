export const htmlMessage = (name, url) =>
  `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mail From UncleAbbey</title>
    <style>
        div {
            text-align: center;
        }
        .container {
            display: flex;
            height: 50vh;
            justify-content: center;
            align-items: center;
            width: 40%;
            margin: auto;
            background: #f1f1f1;
            padding: 2em;
        }
        .container > div {
            text-align: center;
        }
        .reset {
           padding: 2em 8em;
            color: white;
            background: #000;
            border: 0;
            outline: 0;
            cursor: pointer; 
        }
        .icon {
            margin-left: 1em;
            width: 30px;
            height: 30px;
        }
        .image-cont {
            margin-top: 1em;
        }
        
    </style>
</head>
<body>
    <div class="container">
        <div>
            <img src="https://res.cloudinary.com/kayode/image/upload/v1622302766/demo/logo_kotfpn.png" alt="logo">
            <h4>Verify your email Address</h4>
            <h1>Hi ${name}</h1>
            <p>To complete email verification, please press this button</p>
            <a href=${url}><button class="reset">Verify your email Address</button></a>
            <p>If you didn't create an account, please ignore this mail</p> 
        </div>
        
    </div>
    <div class="image-cont">
         <img src="https://res.cloudinary.com/kayode/image/upload/v1622303958/fb_icon_325x325_xfvldm.png" alt="Facebook" class="icon">
    <img src="https://res.cloudinary.com/kayode/image/upload/v1622303813/Btnfm47p_400x400_ya5u4s.jpg" alt="Twitter" class="icon">
    </div>
   
</body>
</html>
    `;

export const textMessage = (name, url) =>
  `
    Welcome to Uncleabbey Blog ${name}
    We are happy to have you share your thoughts on our blog, We hope that you enjoy putting your thought into words. let  us do this, but before then we need a little help from you. Click on ${url} to confiem your account
    `;
export const forgetPasswordHtml = (url) =>
  `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mail From UncleAbbey</title>
    <style>
        
         body {
            text-align: center;
        }
        .container {
            text-align: center;
            display: flex;
            height: 50vh;
            justify-content: center;
            align-items: center;
            width: 40%;
            margin: auto;
            background: #f1f1f1;
             padding: 2em;
        }
        .reset {
           padding: 2em 8em;
            color: white;
            background: #000;
            border: 0;
            outline: 0;
            cursor: pointer; 
        }
        .icon {
            margin-left: 1em;
            width: 30px;
            height: 30px;
        }
        .image-cont {
            margin-top: 1em;
            text-align: center;
        }
         @media screen and (max-width: 650px) {
            .container {
                width: 80%;
            }
            .reset {
                padding: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
    <div>
        <img src="https://res.cloudinary.com/kayode/image/upload/v1622302766/demo/logo_kotfpn.png" alt="logo">
        <h1>Welcome</h1>
        <p>Seems like you forget your password for Uncleabbey Blog. if this is true, click the link below to reset your password</p>
        <a href="${url}"><button class="reset">Reset My Password</button></a>
        <p>Or paste the following link ${url} in your browser</p>
        <p>If you didn't forget your password, please ignore this mail</p>
    </div>
    </div>
    <div class="image-cont">
        <a href="https://twitter.com/uncleabbey_">
            <img src="https://res.cloudinary.com/kayode/image/upload/v1622303958/fb_icon_325x325_xfvldm.png" alt="Facebook" class="icon">
        </a>
        <a href="https://m.facebook.com/kayode.abiodun.7543653">
        <img src="https://res.cloudinary.com/kayode/image/upload/v1622303813/Btnfm47p_400x400_ya5u4s.jpg" alt="Twitter" class="icon">
        </a>
    </div>
</body>
</html>
   `;
export const forgetPasswordText = (url) => `
        Seems like you forget your password for Uncleabbey Blog. if this is true, click the link below to reset your password
        click here ${url} to reset your password
`;
