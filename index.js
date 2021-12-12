const puppeteer = require('puppeteer');
const fs = require('fs');
const request = require('request');
const sharp = require('sharp')
const Tesseract =require('tesseract.js');
const mongoose = require('mongoose');
const Data = require('./model');
var randomstring = require("randomstring");
const useProxy = require('puppeteer-page-proxy');


var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
     // console.log('content-type:', res.headers['content-type']);
     // console.log('content-length:', res.headers['content-length']);
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
mongoose.connect("mongodb://voice:123456@15.207.216.233:27017/voice?authSource=voice", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   // useFindAndModify: false
  //  useCreateIndex: true
})
.then(() => {
    console.log('Database connection is ready..');
})
.catch((err) => {
    console.log(err);
})
function benet(){
  console.log('start')
Data.findOne({'noss':1},async (err,data)=>{
  if(err){
    console.log(err)
  }else{
   // const phone = (data.phone)
    const browser = await puppeteer.launch({ headless: true});
  const page = await browser.newPage();
//   await page.setRequestInterception(true);
// page.on('request', req => {
//     useProxy(req, 'socks5://127.0.0.1:9000');
// });

  
 // await page.goto('https://nordvpn.com/what-is-my-ip/', {waitUntil: 'load', timeout: 90000});
  await page.goto('https://tracking.icubeswire.co/aff_c?offer_id=2596&aff_id=4862');
  await page.waitForNavigation();
 // await page.screenshot({ path: 'example.png' });
  await page.type('input[name=fullname]', data.name, {delay: 20})
  await page.waitForTimeout(100 );
  await page.type('input[name=txt_applyOnline_emailid]', data.email, {delay: 20})
  await page.waitForTimeout(100 );
  await page.type('input[name=txt_applyOnline_contactnumber]',data.phone , {delay: 20})
  
  // await page.$eval('#fullname', el => el.value = data.name);
  // await page.$eval('#txt_applyOnline_emailid', el => el.value = data.email);
  // await page.$eval('#txt_applyOnline_contactnumber', el => el.value = data.phone);
  await page.waitForTimeout(1000 );
  const [button] = await page.$x("//small[contains(., 'Select State')]");
  if (button) {
       await button.click();
    }
    await page.waitForTimeout(3000 );
  const el = await page.waitForSelector('div#mCSB_1_container > li:nth-child(18)');
  await el.click();
  await page.waitForTimeout(3000 );
  const [button1] = await page.$x("//small[contains(., 'Select City')]");
  if (button1) {
       await button1.click();
    }
    await page.waitForTimeout(3000 );
  const el1 = await page.waitForSelector('div#mCSB_2_container > li:nth-child(33)');
  await el1.click();
  await page.waitForTimeout(3000 );
  const [button2] = await page.$x("//small[contains(., 'Select Branch')]");
  if (button2) {
       await button2.click();
    }
    await page.waitForTimeout(3000 );
  const el2 = await page.waitForSelector('div#mCSB_3_container > li:nth-child(7)');
  await el2.click();
  // await fs.unlinkSync('BlobEvent.png');
  // await fs.unlinkSync('BlobEvent.ne.png');
  // await fs.unlinkSync('eng.traineddata');
  // await page.waitForTimeout(5000 );
  //const filename = randomString(5);
  // var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // var random = _.sample(possible, 5).join('');
 // console.log(random);
 await page.waitForTimeout(1000 );
  const filename = randomstring.generate(7);
  console.log(filename);
await page.screenshot({path:filename+'.png'})

await page.waitForTimeout(3000 );
sharp(filename+'.png')
    .extract({ left: 300, top: 200, width: 150, height: 80 })
    .toFile('./BlobEvent.ne.png', function (err) {
        if (err) console.log(err);
        Tesseract.recognize(
          'BlobEvent.ne.png',
          'eng',
          { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
          console.log(text);
           page.waitForTimeout(5000 );
          page.type('input[name=captchaCode]', text, {delay: 20})
         // page.$eval('#captchaCode', el => el.value = text);
        })
    })

  await page.waitForTimeout(5000 );
    await page.$eval('input[name="consentCheck"]', check => check.checked = true);
    await page.waitForTimeout(1000 );
    const [linkHandler7] = await page.$x("//a[contains(., 'Submit')]");
                  if(linkHandler7)
                  {
                    await page.waitForTimeout(3000 );
                      await linkHandler7.click(); 
                      await page.waitForTimeout(3000 );
                      Data.updateOne({"_id":data._id},{ $set: { "noss": 0 }},(err,upda)=>{
                        console.log(upda);
                      })
      }else{
        console.log('failed')
      }
      await page.waitForTimeout(4000 );
      await browser.close();
      await fs.unlinkSync(filename+'.png');
      console.log('Done')
     
  }
})
}
//benet();
setInterval(function(){ 
	benet();
}, 90000);

// (async () => {
//  const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto('https://tracking.icubeswire.co/aff_c?offer_id=2596&aff_id=4862');
//   await page.waitForNavigation();
//   await page.screenshot({ path: 'example.png' });
//   await page.$eval('#fullname', el => el.value = 'ancey');
//   await page.$eval('#txt_applyOnline_emailid', el => el.value = 'test@example.com');
//   await page.$eval('#txt_applyOnline_contactnumber', el => el.value = '8080100512');
//   await page.waitForTimeout(3000 );
//   const [button] = await page.$x("//small[contains(., 'Select State')]");
//   if (button) {
//        await button.click();
//     }
//   const el = await page.waitForSelector('div#mCSB_1_container > li:nth-child(18)');
//   await el.click();
//   await page.waitForTimeout(3000 );
//   const [button1] = await page.$x("//small[contains(., 'Select City')]");
//   if (button1) {
//        await button1.click();
//     }
//   const el1 = await page.waitForSelector('div#mCSB_2_container > li:nth-child(33)');
//   await el1.click();
//   await page.waitForTimeout(3000 );
//   const [button2] = await page.$x("//small[contains(., 'Select Branch')]");
//   if (button2) {
//        await button2.click();
//     }
//   const el2 = await page.waitForSelector('div#mCSB_3_container > li:nth-child(7)');
//   await el2.click();
  

// await page.screenshot({path:'BlobEvent.png'})


// sharp('./BlobEvent.png')
//     .extract({ left: 300, top: 200, width: 150, height: 80 })
//     .toFile('./BlobEvent.ne.png', function (err) {
//         if (err) console.log(err);
//         Tesseract.recognize(
//           'BlobEvent.ne.png',
//           'eng',
//           { logger: m => console.log(m) }
//         ).then(({ data: { text } }) => {
//           console.log(text);
//           page.type('input[name=captchaCode]', text, {delay: 20})
//          // page.$eval('#captchaCode', el => el.value = text);
//         })
//     })

//   await page.waitForTimeout(5000 );
//     await page.$eval('input[name="consentCheck"]', check => check.checked = true);
//     const [linkHandler7] = await page.$x("//a[contains(., 'Submit')]");
//                   if(linkHandler7)
//                   {
//                       await linkHandler7.click(); 
//       }
//   //   await page.waitForSelector("#consentCheck");

//   // await page.evaluate(() => {
//   //   document.querySelector("#consentCheck").parentElement.click();
//   // });
  


// // Recognize German text in a single uniform block of text and set the binary path

// // var options = {
// //   l: 'deu',
// //   psm: 6,
// //   binary: '/usr/local/bin/tesseract'
// // };

// // tesseract.process(__dirname + '/path/to/image.jpg', options, function(err, text) {
// //   if(err) {
// //       console.error(err);
// //   } else {
// //       console.log(text);
// //   }
// // });
//    // console.log('done');

//   // await page.waitForSelector('#img_captcha');             // wait for the selector to load
//   // const logo = await page.$('#img_captcha');              // declare a variable with an ElementHandle
//   // const box = await logo.boundingBox();              // this method returns an array of geometric parameters of the element in pixels.
//   // const x = box['x'];                                // coordinate x
//   // const y = box['y'];                                // coordinate y
//   // const w = box['width'];                            // area width
//   // const h = box['height'];                           // area height
//   // await page.screenshot({'path': 'logo.png', 'clip': {'x': 426, 'y': 600, 'width': 426, 'height': 150}});  
//   // await page.waitForSelector('#formApplyNow > ul > li:nth-child(8) > span');          // wait for the selector to load
//   // const element = await page.$('#formApplyNow > ul > li:nth-child(8) > span');        // declare a variable with an ElementHandle
//   // await element.screenshot({path: 'google.png'});

// //   const [button] = await page.$x("//small[contains(., 'Select State')]");
// // if (button) {
// //  await button.click();
// // }
// // await page.waitForTimeout(1000 );
// // const [linkHandlers] = await page.$x("//li[contains(text(), 'BIHAR')]");
// // await page.waitForTimeout(1000 );
// // if (linkHandlers.length > 0) {
// //   //  await linkHandlers.press('Enter');
// //    await linkHandlers[0].click();
// //   } else {
// //     throw new Error("Link not found");
// //   }
// //  // await page.mouse.click(142, 805, { button: 'left' })
//  // await page.waitForTimeout(1000) // Leave extra time for complete the page load (Just to be cautious)
// //   const linkHandlers = await page.$x("//li[contains(text(), 'BIHAR')]");
// //   await linkHandlers.hover();
// // await linkHandlers.click();
//   // if (linkHandlers.length > 0) {
//   //   await linkHandlers.press('Enter');
//   //  // await linkHandlers[0].click();
//   // } else {
//   //   throw new Error("Link not found");
//   // }
//  // let itemSelector="#branchState > ul > li:first-child(5)";
//   //await page.click('.bob-custom-dropdown-list > li:first-child(5)');
//   // await page.$$eval('#mCSB_1_container', elements => {
//   //   const element = elements.find(element => element.innerText === 'BIHAR');
//   //   element.click();
//   // });
//   // const textContent = await page.evaluate(() => document.querySelector('small').textContent); 
//   // const innerText = await page.evaluate(() => document.querySelector('small').innerText);        
//   // console.log(textContent);  
//   // console.log(innerText);
  
//  // await page.ul('ul[id="branchState"]', 'BIHAR')
//   //let itemSelector="#branchState > ul > li:nth-child(1)";
//   //await page.$eval('#branchState', el => el.value = '8080100512');
// //   await page.click('#branchState');
// //   await page.click('.dropdown__list > div:nth-child(8)');
// //await page.$eval('//small', element => element.innerText = 'Hello, world!');
// // await page.evaluate(() => {
// //     const button = page.$x("//small[contains(., 'Select State')]");
// //     button.innerHTML = "change to something"
// //  });
// //   const [button] = await page.$x("//small[contains(., 'Select State')]");
// // if (button) {
// //  // await button.innerText = '';

// //  console.log(button.innerText)

// // }
// // const elements = await page.$x("//form>ul>li[contains(., 'BIHAR')]");
// //   await elements[0].click() 
// // await page.waitForTimeout(1000 );
// // await page.keyboard.press("Tab");
// // await page.keyboard.press("Tab");
// // const [button1] = await page.$x("//li[contains(., 'BIHAR')]");
// // if (button1) {
// //   await button1.click();
// //}
// // const [button1] = await pSage.$x("//li[contains(., 'BIHAR')]");
// // if (button1) {
// //     await button1.click();
// // }
// // await page.waitForTimeout(1000);
// // const buttons = await page.$x("//ul/li//state-code[contains(text(), 'BIHAR')]");
// // await buttons.click();
// //await page.click('.state-code > li:nth-child(8)');
// // const [button1] = await page.$x("//li > state-code[contains(., 'BIHAR')]");
// // if (button1) {
// //     await button1.click();
// // }
// // await page.keyboard.press('ArrowDown');
// // await page.keyboard.press('ArrowDown');
// // await page.keyboard.press('ArrowDown');
// // await page.keyboard.press('ArrowDown');
// // await page.keyboard.press('ArrowDown');
// // await page.keyboard.press('ArrowDown');
// // await page.keyboard.press('ArrowDown');
// // await page.keyboard.press('ArrowDown');
// //   await page.waitForSelector('input[name=fullname]');
// //       await page.keyboard.type('ancey', {delay: 20})
// //       await page.waitForTimeout(1000);
// //       await page.waitForSelector('input[name=txt_applyOnline_emailid]');
// //       await page.keyboard.type('ancey@gmail.com', {delay: 20})
// //       await page.waitForTimeout(1000);
// //       await page.waitForSelector('input[name=txt_applyOnline_contactnumber]');
// //       await page.keyboard.type('8080100512', {delay: 20})
// //     const browser = await puppeteer1.launch({ headless: false });
// //    // const page = await browser.newpage();
// //     const page = await browser.newPage();
// //     await page.goto('https://tracking.icubeswire.co/aff_c?offer_id=2596&aff_id=4862');
// //     await page.waitForNavigation();
// //     //await page.waitForTimeout(1000);
// //     await page.waitForSelector('input[name=fullname]');
// //     await page.keyboard.type('ancey', {delay: 20})
// //     await page.waitForTimeout(1000);
// //     await page.waitForSelector('input[name=txt_applyOnline_emailid]');
// //     await page.keyboard.type('ancey@gmail.com', {delay: 20})
// //     await page.waitForTimeout(1000);
// //     await page.waitForSelector('input[name=txt_applyOnline_contactnumber]');
// //     await page.keyboard.type('8080100512', {delay: 20})
//     // const branchState = '#branchState'
//     // await page.click(branchState);
// //     // Find Element by Text and Click it
// //     const [linkHandler] = await page.$x("//span[contains(., 'Use email instead')]");
// //                   if(linkHandler)
// //                   {
// //                       await linkHandler.click(); 
// //       }
// //       await page.waitForTimeout(1000);
// //       await page.type('input[name=email]', 'shijuzibba+oddie@gmail.com', {delay: 20})
// //       await page.waitForTimeout(1000);
// //       const selectElem = await page.$('#SELECTOR_1');
// //       await selectElem.type('January', {delay: 20});
// //       await page.waitForTimeout(1000);
// //       const selectElem1 = await page.$('#SELECTOR_2');
// //       await selectElem1.type('8', {delay: 20});
// //       await page.waitForTimeout(1000);
// //       const selectElem2 = await page.$('#SELECTOR_3');
// //       await selectElem2.type('1985', {delay: 20});
// //       await page.waitForTimeout(1000);

// //       const [linkHandler1] = await page.$x("//span[contains(., 'Next')]");
// //                   if(linkHandler1)
// //                   {
// //                       await linkHandler1.click(); 
// //       }
// //       await page.waitForTimeout(1000);
// //       const [linkHandler2] = await page.$x("//span[contains(., 'Next')]");
// //                   if(linkHandler2)
// //                   {
// //                       await linkHandler2.click(); 
// //       }
// //       await page.waitForTimeout(1000);
// //       const [linkHandler3] = await page.$x("//span[contains(., 'Sign up')]");
// //                   if(linkHandler3)
// //                   {
// //                       await linkHandler3.click(); 
// //       }
// //       await page.waitForTimeout(1000);
// // //       var opts = {
// // //         user: 'gowallet26@gmail.com',
// // //         password: 'India!23',
// // //         port: 993,
// // //         host: 'imap.gmail.com',
// // //         servername: 'imap.gmail.com',
// // //         tls: true,
// // //   tlsOptions: {
// // //     servername: 'imap.gmail.com', // See https://github.com/nodejs/node/issues/28167
// // //   },
// // //         mailbox: 'INBOX' // Optional, default: [Gmail]/All Mail
// // //     };
    
// // //     gmail.getLastEmail(opts, function (err, email) {
// // //         if (err) {
// // //             return console.error(err);
// // //         }
// // //         console.log('to:', email.to);
// // //         console.log('from:', email.from);
// // //         email.text && console.log('text:', email.text);
// // //         email.html && console.log('html:', email.html);
// // //     });
// //       const page = await browser.newPage();
// //   await page.goto('http://gmail.com');

// //   const navigatePage = page.waitForNavigation();

// //   const email = 'input[type="email"]';
  

// //   await page.waitForSelector(email);
// //   await page.type(email, 'shijuzibba@gmail.com', {delay: 20});
// //   await Promise.all([page.keyboard.press('Enter')]);
// //   await page.waitForTimeout(10000);
// //   const password = 'input[type="password"]';
// //   await page.waitForSelector(password);
// //   await page.type(password, 'India!23', {delay: 20});
// //   await Promise.all([page.keyboard.press('Enter'), navigatePage]);
// //   await page.waitForTimeout(20000);
  
// //   const data = await page.$$eval('table tr td', tds => tds.map((td) => {
// //     return td.innerText;
// //   }));
  
// //   //[ 'One', 'Two', 'Three', 'Four' ]
// //   console.log(data[16]);
// //   var tecr = data[16];
// //   let result = tecr.substr(0, 6);
// //   console.log(result)
// //   await page.waitForTimeout(1000);
// //   await page.waitForSelector('input[name=verfication_code]');
// //   await page.keyboard.type(result, {delay: 20})
// //   await page.waitForTimeout(1000);
// //   // const [linkHandler6] = await page.$x("//span[contains(., 'Next')]");
// //   //                 if(linkHandler6)
// //   //                 {
// //   //                     await linkHandler6.click(); 
// //   //     }
// //   //     await page.waitForTimeout(10000);
// //   //     await page.waitForSelector('input[name=password]');
// //     // await page.keyboard.type('test54666666')
// //     // await page.waitForTimeout(300);
// //     // const [linkHandler7] = await page.$x("//span[contains(., 'Next')]");
// //     //               if(linkHandler7)
// //     //               {
// //     //                   await linkHandler7.click(); 
// //     //   }
// // //   const [linkHandler4] = await page.$x("//span[contains(., 'is your Twitter verification code')]");
// // //                   if(linkHandler4)
// // //                   {
// // //                       await linkHandler4.click(); 
// // //       }

    
//   })();

