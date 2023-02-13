class CharacterFeatures{
    character = document.querySelector('#character');
    parentElement = this.character.parentNode;
    parentElementHeight = this.parentElement.offsetHeight;
    characterPositionOnTheY_axis = null;
    characterPositionOnTheX_axis = parseInt((this.parentElement.offsetWidth / 2) - (this.character.offsetWidth / 2));
    characterInitialPosition = this.character.offsetTop;
    rightHoritontalLimit = (this.parentElement.offsetWidth - this.character.offsetWidth);
    leftHoritontalLimit = -30;
    pathForImage = './assets/img/';
    pathForAudio = './assets/audio/';
    characterAudio = null;
    characterImage = null;
    characterIsDie = false;
    checkJump = false;

    
    constructor(){
        this.createImage();
    }

    checkAction(event){
        if(!this.characterIsDie){

            switch (event.key) {
                case ' ':
                    this.actionJump();
                    break;
                case 'ArrowRight':
                    this.moveCharacterForRight();
                    break;
                case 'ArrowLeft':
                    this.moveCharacterForLeft();
                    break;
                default:
                    break;
            }
        }
    }

    createImage(){
        const image = document.createElement('img');
        image.setAttribute('id', 'image');
        image.src = `${this.pathForImage}person.png`;
        this.character.appendChild(image);
        this.characterImage = image;
    }

    actionJump(){
        if(!this.checkJump){
            this.checkJump = true;
            this.characterSound('jumping');
            this.characterAnimation('jumping');
            let characterHeight = 0;

            const setIntervalIndex = setInterval(()=>{
                characterHeight += 10;
                this.changingCharacterVertical(characterHeight);
                let characterPosition = this.character.offsetTop;
                
                if(characterPosition <= this.parentElementHeight * 0.5){
                    this.characterPositionOnTheY_axis = characterHeight;
                    this.stopAction(setIntervalIndex);
                    this.dropAction();
                }

            }, 30)
        }
    }

    dropAction(){
        this.characterAnimation('fallingDown');
        let characterHeight = this.characterPositionOnTheY_axis;

        const setIntervalIndex = setInterval(()=>{
            characterHeight -= 10;
            this.changingCharacterVertical(characterHeight);
            let characterPosition = this.character.offsetTop;

            if(characterPosition >= this.characterInitialPosition){
                this.checkJump = false;
                this.stopAction(setIntervalIndex);
                this.die();
            }

        }, 45)
    }

    moveCharacterForRight(){
        this.characterPositionOnTheX_axis -= this.characterPositionOnTheX_axis <= this.leftHoritontalLimit ? 0 : 10;
        this.changingCharacterHorizontal(this.characterPositionOnTheX_axis);
    }
    
    moveCharacterForLeft(){
        this.characterPositionOnTheX_axis += this.characterPositionOnTheX_axis >= this.rightHoritontalLimit ? 0 : 10;
        this.changingCharacterHorizontal(this.characterPositionOnTheX_axis);
    }
    
    changingCharacterHorizontal(characterPosition){
        this.character.style.right = `${characterPosition}px`
    }

    changingCharacterVertical(characterPosition){
        this.character.style.bottom = `${characterPosition}px`;
    }
    
    characterSound(song){
        const audio = new Audio();
        this.characterAudio = audio;
        this.characterAudio.src = `${this.pathForAudio}${song}.mp3`;
        this.characterAudio.play();        
    }
    
    characterAnimation(file){
        this.characterImage.src = `${this.pathForImage}${file}.png`;
    }
    
    stopAction(setIntervalIndex){
        clearInterval(setIntervalIndex);
    }
    
    die(){
        // this.characterIsDie = true;
        this.characterSound('dead');
        this.characterAnimation('dead');
    }
}

export default CharacterFeatures;
