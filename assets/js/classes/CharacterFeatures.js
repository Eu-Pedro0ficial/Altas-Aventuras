class CharacterFeatures{
    character = document.querySelector('#character');
    parentElement = this.character.parentNode;
    parentElementHeight = this.parentElement.offsetHeight;
    characterPositionOnTheY_axis = null;
    pathForImage = './assets/img/';
    pathForAudio = './assets/audio/';
    characterAudio = null;
    characterImage = null;
    characterIsDie = false;
    checkJump = false;
    
    constructor(){
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
        if(!this.checkJump && !this.characterIsDie){
            this.checkJump = true;
            this.characterSound('jumping');
            this.characterAnimation('jumping');
            let characterHeight = this.parentElementHeight;

            const setIntervalIndex = setInterval(()=>{
                characterHeight -= 10;
                this.changingCharacterHeight(characterHeight);
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
            characterHeight += 10;
            this.changingCharacterHeight(characterHeight);
            let characterPosition = this.character.offsetTop;

            if(characterPosition >= this.parentElementHeight - this.character.offsetHeight){
                this.checkJump = false;
                this.stopAction(setIntervalIndex);
                this.die();
            }

        }, 45)
    }
    
    changingCharacterHeight(characterHeight){
        this.parentElement.style.height = `${characterHeight}px`;
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
        this.characterIsDie = true;
        this.characterSound('dead');
        this.characterAnimation('dead');
    }
}

export default CharacterFeatures;
