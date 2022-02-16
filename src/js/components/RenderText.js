class RenderText{
  constructor(wrapper){
    const thisRenderText = this;

    thisRenderText.wrapper = wrapper; 
    
    thisRenderText.changeText();
  }

  changeText(){
    const thisRenderText = this;
    
    thisRenderText.wrapper.innerHTML = thisRenderText.wrapper.innerHTML.toUpperCase();
  }
}

export default RenderText;