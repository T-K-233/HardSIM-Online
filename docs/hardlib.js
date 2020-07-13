
  class Pin {
    constructor(type) {
      this.type = type;
      this.value = 0;
    }
  }
  
  class Wire {
    constructor() {
      this.value = 0;
      this.nodes = [];
    }
    
    render() {
      if (this.value) {
        ctx.strokeStyle = ON_COLOR;
      }
      else {
        ctx.strokeStyle = OFF_COLOR;
      }
      ctx.beginPath();
      for (var i=0; i<this.nodes.length; i+=1) {
        if (i == 0) {
          ctx.moveTo(this.nodes[i][0]*GRID_SIZE,this.nodes[i][1]*GRID_SIZE);
        }
        else {
          ctx.lineTo(this.nodes[i][0]*GRID_SIZE,this.nodes[i][1]*GRID_SIZE);
        }
      }
      ctx.stroke();
    }
  }
  
  class Component {
    constructor(pos) {
      this.pos = pos;
      this.img = null;
      this.type = "";
    }
    
    render() {
      
    }
  }
  
  class InputButton extends Component {
    constructor(pos, OUT) {
      super(pos);
      this.size = [2, 2];
      this.type = "INPUT_DEVICE";
      this.value = 0;
      this.OUT = OUT ? OUT : null;
      
      this.OUT.nodes.push([this.pos[0]+2, this.pos[1]+1]);
    }
    
    onclick() {
      this.value = 1 - this.value;
    }
    
    update() {
      this.OUT.value = this.value;
    }
    
    render() {
      let text = "0";
      if (this.value) {
        ctx.fillStyle = ON_COLOR;
        text = "1";
      }
      else {
        ctx.fillStyle = OFF_COLOR;
      }
      ctx.fillRect(this.pos[0]*GRID_SIZE, this.pos[1]*GRID_SIZE, this.size[0]*GRID_SIZE, this.size[1]*GRID_SIZE);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "16px Arial";
      ctx.fillText(text, (this.pos[0]+0.5)*GRID_SIZE, (this.pos[1]+1.5)*GRID_SIZE);
    }
  }
  
  class LED extends Component {
    constructor(pos, IN) {
      super(pos);
      this.size = [2, 2];
      this.value = 0;
      this.IN = IN ? IN : null;
      
      this.IN.nodes.push([this.pos[0], this.pos[1]+1]);
    }
    
    update() {
      this.value = this.IN.value;
    }
    
    render() {
      let text = "0";
      if (this.value) {
        ctx.fillStyle = ON_COLOR;
        text = "1";
      }
      else {
        ctx.fillStyle = OFF_COLOR;
      }
      ctx.fillRect(this.pos[0]*GRID_SIZE, this.pos[1]*GRID_SIZE, this.size[0]*GRID_SIZE, this.size[1]*GRID_SIZE);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "16px Arial";
      ctx.fillText(text, (this.pos[0]+0.5)*GRID_SIZE, (this.pos[1]+1.5)*GRID_SIZE);
    }
  }
  
  class NOT extends Component {
    constructor(pos, IN, OUT) {
      super(pos);
      this.size = [3, 2];
      this.IN = IN ? IN : null;
      this.OUT = OUT ? OUT : null;
      
      this.IN.nodes.push([this.pos[0], this.pos[1]+1]);
      this.OUT.nodes.push([this.pos[0]+2, this.pos[1]+1]);
      
      this.img = new Image();
      this.img.src = "./assets/not_gate.png";
    }
    
    update() {
      this.OUT.value = 1 - this.IN.value;
    }
    
    render() {
      ctx.drawImage(this.img, this.pos[0]*GRID_SIZE, this.pos[1]*GRID_SIZE, this.size[0]*GRID_SIZE, this.size[1]*GRID_SIZE);
    }
  }
  class OR extends Component {
    constructor(pos, A, B, OUT) {
      super(pos);
      this.A = A ? A : null;
      this.B = B ? B : null;
      this.OUT = OUT ? OUT : null;
      
      this.A.nodes.push([this.pos[0], this.pos[1]]);
      this.B.nodes.push([this.pos[0], this.pos[1]+2]);
      this.OUT.nodes.push([this.pos[0]+2, this.pos[1]+1]);
      
      this.img = new Image();
      this.img.src = "./assets/or_gate.png";
    }
    
    update() {
      this.OUT.value = this.A.value || this.B.value;
    }
    
    render() {
      ctx.drawImage(this.img, this.pos[0]*GRID_SIZE, this.pos[1]*GRID_SIZE, 3*GRID_SIZE, 2*GRID_SIZE);
    }
  }
  class AND extends Component {
    constructor(pos, A, B, OUT) {
      super(pos);
      this.A = A ? A : null;
      this.B = B ? B : null;
      this.OUT = OUT ? OUT : null;
      
      this.A.nodes.push([this.pos[0], this.pos[1]]);
      this.B.nodes.push([this.pos[0], this.pos[1]+2]);
      this.OUT.nodes.push([this.pos[0]+2, this.pos[1]+1]);
      
      this.img = new Image();
      this.img.src = "./assets/and_gate.png";
    }
    
    update() {
      this.OUT.value = this.A.value && this.B.value;
    }
    
    render() {
      ctx.drawImage(this.img, this.pos[0]*GRID_SIZE, this.pos[1]*GRID_SIZE, 3*GRID_SIZE, 2*GRID_SIZE);
    }
  }