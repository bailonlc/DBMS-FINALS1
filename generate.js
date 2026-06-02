const fs = require('fs');

const products = [
    { "name": "60HE OG", "image": "images/60HE_OG.webp" },
    { "name": "AKKO", "image": "images/AKKO.webp" },
    { "name": "AKKOCS", "image": "images/AKKOCS.webp" },
    { "name": "AULA f75", "image": "images/AULA f75.webp" },
    { "name": "Ajazz AK820 Pro", "image": "images/Ajazz AK820 Pro.webp" },
    { "name": "BLACKOUT", "image": "images/BLACKOUT.webp" },
    { "name": "Corsair e 2048x", "image": "images/Corsair-e_2048x.webp" },
    { "name": "DRUNK DEER", "image": "images/DRUNK DEER.webp" },
    { "name": "EPOmaker", "image": "images/EPOmaker.webp" },
    { "name": "Filco Majestouch 3", "image": "images/Filco Majestouch 3.jpg" },
    { "name": "GATERONOIL", "image": "images/GATERONOIL.jpg" },
    { "name": "GMKDOTS", "image": "images/GMKDOTS.webp" },
    { "name": "GMKHEN", "image": "images/GMKHEN.png" },
    { "name": "GMKNORD", "image": "images/GMKNORD.webp" },
    { "name": "GMKOLIVIA", "image": "images/GMKOLIVIA.webp" },
    { "name": "GMMK 2", "image": "images/GMMK 2.webp" },
    { "name": "Glorious GMMK Pro review", "image": "images/Glorious+GMMK+Pro+review.webp" },
    { "name": "HHKB PROF", "image": "images/HHKB PROF.jpg" },
    { "name": "HK gaming", "image": "images/HK gaming.webp" },
    { "name": "IQUNIX F97 Series Hitchhiker", "image": "images/IQUNIX-F97-Series-Hitchhiker-Gaming-Keyboard-Featured-Image-1024x555.webp" },
    { "name": "KAMSUPERUSER", "image": "images/KAMSUPERUSER.webp" },
    { "name": "KATALPHA", "image": "images/KATALPHA.webp" },
    { "name": "KATMILKSHAKE", "image": "images/KATMILKSHAKE.webp" },
    { "name": "KEYCHRON K2 PRO", "image": "images/KEYCHRON K2 PRO.webp" },
    { "name": "KINETIC", "image": "images/KINETIC.webp" },
    { "name": "LEOBOG HI75", "image": "images/LEOBOG HI75.webp" },
    { "name": "LOFREE FLOW", "image": "images/LOFREE FLOW.webp" },
    { "name": "LOGITECH G PRO", "image": "images/LOGITECH G PRO.webp" },
    { "name": "MAGICGIRL", "image": "images/MAGICGIRL.webp" },
    { "name": "MARBLE", "image": "images/MARBLE.webp" },
    { "name": "MELETRIZ BOOG75", "image": "images/MELETRIZ BOOG75.webp" },
    { "name": "MODE ENVOY", "image": "images/MODE ENVOY.webp" },
    { "name": "MONSGEEK M1", "image": "images/MONSGEEK M1.webp" },
    { "name": "NICEPBT", "image": "images/NICEPBT.webp" },
    { "name": "NICEPBTSOJU", "image": "images/NICEPBTSOJU.webp" },
    { "name": "NKCREAM", "image": "images/NKCREAM.webp" },
    { "name": "RAINY75", "image": "images/RAINY75.webp" },
    { "name": "RAZER HUNTSMAN", "image": "images/RAZER HUNTSMAN.webp" },
    { "name": "Royal Kludge RK61", "image": "images/Royal_Kludge_RK61_Trimode_Red_switch_Mechanical_Keyboard_Black-b_2048x.webp" },
    { "name": "SAVILEBLOOM", "image": "images/SAVILEBLOOM.jpg" },
    { "name": "STEELSERIES", "image": "images/STEELSERIES.webp" },
    { "name": "TENCSEE", "image": "images/TENCSEE.webp" },
    { "name": "TTCGOLD", "image": "images/TTCGOLD.jpg" },
    { "name": "VARMILLIO", "image": "images/VARMILLIO.webp" },
    { "name": "VGN DRAGON BALL", "image": "images/VGN DRAGON BALL.webp" },
    { "name": "WOOTING TOW HE", "image": "images/WOOTING TOW HE.jpg" },
    { "name": "WUQUE", "image": "images/WUQUE.jpg" },
    { "name": "XDA", "image": "images/XDA.webp" },
    { "name": "ZSA VOYAGER", "image": "images/ZSA VOYAGER.webp" },
    { "name": "ducky one", "image": "images/ducky one.webp" },
    { "name": "endgame gear", "image": "images/endgame gear.webp" },
    { "name": "feker", "image": "images/feker.webp" },
    { "name": "keychoneQ1 pro", "image": "images/keychoneQ1 pro.jpg" },
    { "name": "keychron Q1", "image": "images/keychron Q1.webp" },
    { "name": "monsgeek m3", "image": "images/monsgeek m3.webp" },
    { "name": "nuphy", "image": "images/nuphy.webp" },
    { "name": "tofu", "image": "images/tofu.webp" }
];

// Helper to seed randomness for consistency
let seed = 12345;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function getRandomPrice(min, max) {
    return (random() * (max - min) + min).toFixed(2);
}

const detailedProducts = products.map((p, i) => {
    let category = "Keyboard";
    let nameUpper = p.name.toUpperCase();
    if (nameUpper.includes("GMK") || nameUpper.includes("PBT") || nameUpper.includes("KAT") || nameUpper.includes("XDA") || nameUpper.includes("KAMSUPERUSER") || nameUpper.includes("MAGICGIRL") || nameUpper.includes("SAVILEBLOOM") || nameUpper.includes("DOTS") || nameUpper.includes("OLIVIA")) {
        category = "Keycaps";
    } else if (nameUpper.includes("GATERON") || nameUpper.includes("TTC") || nameUpper.includes("CREAM") || nameUpper.includes("AKKOCS") || nameUpper.includes("WUQUE")) {
        category = "Switches";
    } else if (nameUpper.includes("LUBE") || nameUpper.includes("KINETIC")) {
        category = "Accessories";
    }

    let price = 0;
    if (category === "Keyboard") price = getRandomPrice(60, 250);
    else if (category === "Keycaps") price = getRandomPrice(30, 150);
    else if (category === "Switches") price = getRandomPrice(15, 60);
    else price = getRandomPrice(10, 40);

    return {
        id: i + 1,
        name: p.name,
        category: category,
        price: parseFloat(price),
        image: p.image,
        stock: Math.floor(random() * 50) + 1,
        rating: parseFloat((random() * (5 - 3.5) + 3.5).toFixed(1)),
        description: `Experience the premium feel of the ${p.name} ${category.toLowerCase()}. Perfect for enthusiasts looking to upgrade their setup with top-tier components.`
    };
});

fs.writeFileSync('c:\\Users\\dexst\\Downloads\\finalproject-webdev-main\\finalproject-webdev-main\\products.json', JSON.stringify({ products: detailedProducts }, null, 2));
