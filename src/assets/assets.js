import add from './add.png'
import add_green from './add_green.png'
import minus from './minus.png'
import minus_red from './minus_red.png'
import cart from './cart.png'
import close from './close.png'
import DecorIT from './DecorIT.png'
import google from './google.png'
import logo_black from './logo_black.png'
import package1 from './package1.png'
import profile from './profile.png'
import search from './search.png'
import task from './task.png'
import upload from './upload.png'
import headerImage from './headerImage.jpg'
import kitchen from './kitchen.jpg'
import electronics from './electronics.jpg'
import bathwares from './bathwares.jpg'
import wall_art from './wall_art.jpg'
import furnitures from './furnitures.jpg'
import chair from './chair.png'
import table from './table.png'
import electric_kettle from './electric-kettle.png'
import ar_hand from './ar_hand.png'
import arrow from './arrow-right.png'
import delete1 from './delete1.png'
import edit1 from './edit1.png'

export const assets = {
    logo_black,
    close,
    profile,
    add,
    add_green,
    minus,
    minus_red,
    task,
    package1,
    upload,
    cart,
    search,
    google,
    DecorIT,
    headerImage,
    kitchen,
    furnitures,
    electronics,
    bathwares,
    wall_art,
    table,
    chair,
    electric_kettle,
    ar_hand,
    arrow,
    delete1,
    edit1
}

export const category_list=[
    {
        category_name:"Furnitures",
        category_image:furnitures
    },
    {
        category_name:"Electronics",
        category_image:electronics
    },
    {
        category_name:"Bathwares",
        category_image:bathwares
    },
    {
        category_name:"Wall Art",
        category_image:wall_art
    },
    {
        category_name:"Kitchen",
        category_image:kitchen
    }
]

export const item_list=[
    {
        _id:"1",
        name:"Table",
        image:table,
        price:12,
        description:"This is a table",
        category:"Furnitures"
    },
    {
        _id:"2",
        name:"Chair",
        image:chair,
        price:12,
        description:"This is a chair",
        category:"Furnitures"
    },
    {
        _id:"3",
        name:"Electric Kettle",
        image:electric_kettle,
        price:12,
        description:"This is a electric kettle",
        category:"Electronics"
    }
]
