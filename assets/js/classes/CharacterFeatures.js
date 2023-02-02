class CharacterFeatures{
    character = document.querySelector('#character');
    parentElement = this.character.parentNode;
    parentElementHeight = this.parentElement.offsetHeight;
    halfHeightOfParentElement = this.parentElementHeight * 0.5;
    characterPositionOnTheY_axis = null;
    pathForImage = './assets/img/';
    pathForAudio = './assets/audio/';
    checkJump = false;
    characterAudio = null;
    characterImage = null;

    constructor(){
        this.createImage();
    }

    createImage(){
        const image = document.createElement('img');
        image.setAttribute('id', 'image');
        image.src = this.pathForImage + "person.png";
        this.character.appendChild(image);
        this.characterImage = image;
    }

    actionJump(){
        if(!this.checkJump){
            this.checkJump = true;
            this.characterSound('jumping');
            this.characterAnimation('jumping');
            let characterHeight = this.parentElementHeight;

            const setIntervalIndex = setInterval(()=>{
                characterHeight -= 10;
                this.changingCharacterHeight(characterHeight);

                if(this.character.offsetTop <= this.halfHeightOfParentElement){
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
            characterHeight += 10;
            this.changingCharacterHeight(characterHeight);

            if(this.character.offsetTop >= this.parentElementHeight - this.character.offsetHeight){
                this.checkJump = false;
                this.stopAction(setIntervalIndex);
                this.die();
            }

        }, 45)
    }

    die(){
        this.characterSound('dead');
        this.characterAnimation('dead');
    }

    changingCharacterHeight(characterHeight){
        this.parentElement.style.height = `${characterHeight}px`;
    }

    characterSound(song){
        const audio = new Audio();
        this.characterAudio = audio;
        this.characterAudio.src = this.pathForAudio + `${song}.mp3`
        this.characterAudio.play();
    }

    characterSoundPause(){
        this.characterAudio.src = '';
    }

    characterAnimation(file){
        this.characterImage.src = this.pathForImage + `${file}.png`;
    }

    stopAction(setIntervalIndex){
        clearInterval(setIntervalIndex);
    }
    
}

export default CharacterFeatures;
