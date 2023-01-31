class CharacterFeatures{
    character = document.querySelector('#character');
    parentElementHeight = this.character.parentNode.offsetHeight;
    halfHeightOfParentElement = this.parentElementHeight * 0.5;
    pathForImage = './assets/img/';
    pathForAudio = './assets/audio/';
    checkJump = false;
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
            let characterHeight = 0;

            const setIntervalIndex = setInterval(()=>{
                characterHeight += 10;
                this.changingCharacterHeight(characterHeight);

                if(this.character.offsetTop <= this.halfHeightOfParentElement){
                    this.stopAction(setIntervalIndex);
                    this.dropAction();
                }

            }, 20)
        }
    }

    dropAction(){
        this.characterAnimation('fallingDown');
        let characterHeight = this.halfHeightOfParentElement;

        const setIntervalIndex = setInterval(()=>{
            characterHeight -= 10;
            this.changingCharacterHeight(characterHeight);

            if(this.character.offsetTop >= this.parentElementHeight){
                this.checkJump = false;
                this.stopAction(setIntervalIndex);
                this.die();
            }

        }, 35)
    }

    die(){
        this.characterSound('dead');
        this.characterAnimation('dead');
    }

    changingCharacterHeight(characterHeight){
        this.character.style.bottom = `${characterHeight}px`;
    }

    characterSound(song){
        const audio = new Audio(this.pathForAudio + `${song}.mp3`);
        audio.play();
    }

    characterAnimation(file){
        this.characterImage.src = this.pathForImage + `${file}.png`;
    }

    stopAction(setIntervalIndex){
        clearInterval(setIntervalIndex);
    }
    
}

export default CharacterFeatures;
