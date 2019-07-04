let currentPageIndex = 0;
let header = document.querySelector('#header-text');
let loadingBar = document.querySelector('#loading-bar-color');
let uploadText = document.querySelector('#status-text');
let uploadStatusBlock = document.querySelector('#upload-status-block');
let uploadAlert = document.querySelector('#upload-alert');

let introPage = new Page(0, document.getElementById('intro-page'));
let disclaimerPage = new Page(1, document.getElementById('disclaimer-page'));
let tutorialPage = new Page(2, document.getElementById('photo-tutorial-page'));
let detailsPage = new Page(3, document.getElementById('personal-details-page'));
let idTypePage = new Page(4, document.getElementById('id-type-page'));
let documentTypePage = new Page(5, document.getElementById('document-type-page'));
let promptPage = new Page(6, document.getElementById('upload-prompt-page'));
let uploadedDocPage = new Page(7, document.getElementById('uploaded-document-page'));

let pages = [introPage, disclaimerPage, tutorialPage, detailsPage, idTypePage, documentTypePage, promptPage, uploadedDocPage];

let nextButtons = [...document.querySelectorAll('.next-button')];
let idButtons = [...document.querySelectorAll('.id-button')];

let socialSecurityButton = document.querySelector('#social-security-button');
let caseNumberButton = document.querySelector('#case-number-button');
let idTypeText = document.querySelector('#id-type-text');

let uploadButtons = [...document.querySelectorAll('.upload-button')];
let cancelButton = document.querySelector('#cancel-button');
let viewUploadedButton = document.querySelector('#view-uploaded-button');
let uploadMoreButton = document.querySelector('#upload-more-button');
let backButton = document.getElementById('back-button');

function Page(index, page) {
    this.active = false;
    this.index = index;
    this.page = page;

    this.makeActive = () => {
        this.active = true;
        this.page.classList.remove('inactive');
        this.page.classList.add('active');
        this.page.classList.add('z-index');
    }

    this.makeInactive = () => {
        if(this.active === true) {
            let page = this.page;         
            setTimeout(function() {
                setTimeout(function() {
                    page.classList.remove('active');
                }, 1200);
                page.classList.add('becoming-inactive');        
                page.classList.remove('z-index');
            }, 1000);           
            setTimeout(function() {
                page.classList.remove('becoming-inactive');
                page.classList.add('inactive');
            }, 500);
        }
        this.active = false;
    }
}
introPage.active = true;

function pageSwipe(index) { 
    pages.forEach((page) => {
        if(index === page.index) {
            if(page.active === false) {
                page.makeActive();
                currentPageIndex = page.index;
                console.log('Current page index: ' + currentPageIndex);
            }  
        }else {
            page.makeInactive();
        }       
    });
    
    nextButtons.forEach(button => {
        button.style.pointerEvents = 'none';
        setTimeout(()=> {
            button.style.pointerEvents = 'auto';
        }, 800);
    })
    
    switch(index) {
        case 1:
            backButton.classList.remove('no-show'); 
            header.textContent = 'Disclaimer';
            break;
        case 2:
            header.textContent = 'Taking Good Photos';
            break;
        case 3: 
            header.textContent = 'Personal Details';
            break;
        case 4:
            header.textContent = 'Select Identification Type';
            break;
        case 5:
            header.textContent = 'Select Document Type';
            backButton.style.pointerEvents = 'auto';
            break;
        case 6:
            header.textContent = 'Select Document Type';
            backButton.style.pointerEvents = 'none';
            break;
        case 7:
            header.textContent = 'Uploaded Documents';
            backButton.style.pointerEvents = 'auto';
            break;
        default:
            backButton.classList.add('no-show'); 
            header.textContent = 'BDT Document Upload';
    }
}

let goBack = function() {
    if(currentPageIndex > 0) {
        if(currentPageIndex === 5) {
            currentPageIndex = 3;
        } else if (currentPageIndex === 7) {
            currentPageIndex = 5;          
        } else {
            currentPageIndex--;
        }     
        pageSwipe(currentPageIndex);
    }
}

function uploadOptions(option) {
    switch(option) {
        case 6:
            uploadAlert.classList.add('visible');
            break;
        case 7:
            uploadStatusBlock.classList.add('visible');
            uploadMoreButton.style.pointerEvents = 'none';
            uploadMoreButton.style.color = 'rgb(160, 160, 160)';
            viewUploadedButton.style.pointerEvents = 'none';
            viewUploadedButton.style.color = 'rgb(160, 160, 160)';
            loadingBar.style.animation = 'loading 3.5s cubic-bezier(0.1, 0.7, 1.0, 0.1) forwards 1.5s';

            setTimeout(() => {
                if(uploadAlert.classList.contains('invisible')) {
                    uploadAlert.classList.remove('invisible');
                }else {
                    uploadAlert.classList.add('invisible');
                }             
            }, 100);
            setTimeout(() => {
                uploadText.textContent = 'Upload completed!';
                uploadText.style.color = 'green';
                uploadMoreButton.style.pointerEvents = 'auto'; 
                uploadMoreButton.style.color = 'rgb(65, 134, 239)';
                viewUploadedButton.style.pointerEvents = 'auto';
                viewUploadedButton.style.color = 'rgb(65, 134, 239)';
            }, 4500);
            break;
        case "cancel":
            pageSwipe(5);
            break;
        case "close":
             uploadStatusBlock.classList.remove('visible');
             uploadAlert.classList.remove('invisible');
             loadingBar.style.animation = 'none';
             loadingBar.style.width = '0';
             pageSwipe(7);
             setTimeout(() => {
                uploadText.textContent = 'Uploading photo...';
                uploadText.style.color = 'rgb(21, 52, 106)';
            }, 4500);
            break;
        case "upload more":
            uploadStatusBlock.classList.remove('visible');
            uploadAlert.classList.remove('invisible');
            loadingBar.style.animation = 'none';
            loadingBar.style.width = '0';
            pageSwipe(5);
            setTimeout(() => {
                uploadText.textContent = 'Uploading photo...';
                uploadText.style.color = 'rgb(21, 52, 106)';
            }, 4500);
            break;
        default:
            alert('worked!');
    }
}

function pickIDType(type) {
    pageSwipe(3);
    idTypeText.textContent = type;
}

for (i = 0; i < nextButtons.length; i++) {
    nextButtons[i].setAttribute('onclick', `pageSwipe(${i + 1})`);
}
idButtons.forEach(button => {
    button.setAttribute('onclick', 'pageSwipe(6)')
});
uploadButtons.forEach(button => {
    button.setAttribute('onclick', 'uploadOptions(7)')
});
cancelButton.setAttribute('onclick', 'uploadOptions("cancel")');

viewUploadedButton.setAttribute('onclick', 'uploadOptions("close")');
uploadMoreButton.setAttribute('onclick', 'uploadOptions("upload more")');

backButton.setAttribute('onclick', `goBack()`);

socialSecurityButton.setAttribute('onclick', 'pickIDType("Social Security Number")');
caseNumberButton.setAttribute('onclick', 'pickIDType("Case Number")');

