class CharacterFeatures{
    
    constructor(){
        this.character = document.querySelector('#character');
        this.parentElement = this.character.parentNode;
        this.characterPositionOnTheY_axis = 0;
        this.characterPositionOnTheX_axis = parseInt((this.parentElement.offsetWidth / 2) - (this.character.offsetWidth / 2));
        this.characterInitialPosition = this.character.offsetTop;
        this.rightHoritontalLimit = (this.parentElement.offsetWidth - this.character.offsetWidth);
        this.leftHoritontalLimit = -30;
        this.pathForImage = './assets/img/';
        this.pathForAudio = './assets/audio/';
        this.characterAudio = null;
        this.characterImage = null;
        this.characterIsDie = false;
        this.checkJump = false;

        this.isFall = false;
        this.stopJump = false;

        this.createImage();
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
            this.isFall = false;
            this.stopJump = false
            this.checkJump = true;
            this.characterSound('jumping');
            this.characterAnimation('jumping');
            this.characterAfterPosition = this.character.offsetTop
            let characterHeight = this.characterPositionOnTheY_axis;
            
            const setIntervalIndex = setInterval(()=>{
                characterHeight += 2;
                this.changingCharacterVertical(characterHeight);
                let characterPosition = this.character.offsetTop;
                
                if(characterPosition <= (this.characterAfterPosition - 200)){
                    this.characterPositionOnTheY_axis = characterHeight;
                    this.stopAction(setIntervalIndex);
                    this.dropAction();
                }

            }, 3)
        }
    }

    dropAction(){
        this.isFall = true;
        this.characterAnimation('fallingDown');

        this.setIntervalIndex = setInterval(()=>{
            this.characterPositionOnTheY_axis -= 2;
            this.changingCharacterVertical(this.characterPositionOnTheY_axis);
            let characterPosition = this.character.offsetTop;

            if(characterPosition >= this.characterInitialPosition){
                this.checkJump = false;
                this.stopAction(this.setIntervalIndex);
                this.die();
            }

        }, 4)
    }

    moveCharacterForRight(){
        this.characterPositionOnTheX_axis -= this.characterPositionOnTheX_axis <= this.leftHoritontalLimit ? 0 : 5;
        this.changingCharacterHorizontal(this.characterPositionOnTheX_axis);
    }
    
    moveCharacterForLeft(){
        this.characterPositionOnTheX_axis += this.characterPositionOnTheX_axis >= this.rightHoritontalLimit ? 0 : 5;
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
