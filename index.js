// unsplash api
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader');
let ready = false;
let imageLoad = 0;
let totalImages = 0;
let photosArray = []
const count = 10
const apiKey = '4AV3JRrHbWOEAXNNzwK8M9EMrNgsz010CqIhw_R5kIk';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
// /helper function for set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function imageLoaded()
{
    imageLoad++;
    if(imageLoad === totalImages)
    {
        ready = true;
        loader.hidden = true;
    }
}

// create elements for links and photos
function displayPhoto() {
    imageLoad = 0; // set to 0 to load images again reach at end of page 
    totalImages = photosArray.length;
    // Run function for each object
    photosArray.forEach((photo) => { // create <a> to ink unsplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // create img tab for photos
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load' , imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}
// get the photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhoto();
    } catch (err) {}
}

// check to see if scrolling scrolling near bottom page 
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000  && ready)
    {
        ready = false;
        getPhotos();

    }
    // console.log(window.innerHeight + window.scrollY)
    // console.log(document.body.offsetHeight)

})
getPhotos()
