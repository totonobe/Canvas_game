    // canvas base
    // const can = $("#canvas")[0];
    // const ctx = can.getContext("2d");

    const can = $('#canvas')[0];
    const ctx = can.getContext("2d");

    // ctx.fillStyle = "#0f0";
    // ctx.strokeStyle = "#0ff";

    ctx.fillStyle = '#0f0';
    ctx.strokeStyle = '#f00';
    
    
    //ctx.clearRect(120, 120, 50,50,);

    // let position = 100;

    //アニメーションの基本　描画→削除を繰り返して座標を移動
    // setInterval(function(){
    //     ctx.clearRect(position, position, 50,50,);
    //     position++;
    //     ctx.fillRect(position, position, 50, 50);
    // }, 100);

    // let count = 200;
    // setInterval(function(){
        
    //     ctx.clearRect(count,count,20,20);
    //     count++;
    //     ctx.fillRect(count,count,20,20);


    // },50);

    

    /*---------------------------
     * ufoについて
     *--------------------------*/
    //ufoのオブジェクトデータ
    //  const ufo = {
    //     posX:0,
    //     posY:can.height/2,
    //     flag:false,
    //     img:"images/ufo.gif",
    // };

    const ufo = {
        posX:0,
        posY:can.height/2,
        img:'images/ufo.gif',
    };
    
    //ufo描画のための関数
    // const ufoDraw=function(){
    //     const newImage = $("<img>").attr("src",ufo.img);
    //     newImage.on("load",function(){
    //         ctx.drawImage(this, ufo.posX, ufo.posY);
    //         ufo.img = this;
    //         ufo.width=this.width;
    //         ufo.height=this.height;
    //     });  
    // };

    const newImage = $('<img>').attr("src", ufo.img);
    newImage.on("load",function(){
        console.log(this);
        ctx.drawImage(this, ufo.posX, ufo.posY);
        ufo.width = this.width;
        ufo.height = this.height;
        ufo.img = this;
        console.log(ufo);
    });

    // マウス動いたらufoを動かす関数
    // const ufoMove=function(e){
    //     ufo.flag = true;
    //     if(ufo.flag){
    //         ctx.clearRect(0, ufo.posY, ufo.width, ufo.height);
    //         ufo.posY = e.offsetY - ufo.height/2; //ufoの位置情報更新Y
    //         ctx.drawImage(ufo.img, 0, ufo.posY);
    //     }
    // };

    $(can).on("mousemove", function(e){
        ctx.clearRect(ufo.posX, ufo.posY, ufo.width, ufo.height);
        console.log(e);
        ufo.posY = e.offsetY - ufo.height;
        ufo.posX = e.offsetX - ufo.width;
        ctx.drawImage(ufo.img, ufo.posX, ufo.posY, ufo.width, ufo.height);
    })

    // マウスアウトしたらUFOの動き止める
    // const ufoStop = function(){
    //     ufo.flag = false;
    // }
    /*---------------------------
     * 敵について
     *--------------------------*/

    const enemy = {
        posX:can.width-100,
        posY:can.height/2,
        img:'images/stamp10.png'
    };

    const enemyDraw = function() {
    const newImage2 = $('<img>').attr("src", enemy.img);
        newImage2.on("load",function(){
            ctx.drawImage(this,enemy.posX, enemy.posY);
            enemy.width = this.width;
            enemy.height = this.height;
            enemy.posX = can.width - enemy.width;
            enemy.img = this;
            console.log(enemy);
        });
    };

    enemyDraw();

     
    /*---------------------------
     * ufoが発射する弾について
     *--------------------------*/
     //弾のオブジェクト元データ
    // const ballData = {
    //     speed:5,
    //     width:10,
    //     height:10,
    //     posX:0,
    //     posY:0,
    //     color:"#d00",
    // }


    const ballData = {
        speed:30,
        width:200,
        height:10,
        posX:ufo.width,
        posY:ufo.posY,
        color:"#f00"
    };


    //発射された弾を格納するための配列を作成
    const ballGroup = [];

    const name = "こすげ";
    const age = 36;
    
    const name2 = name;
    const age2 = age;

    console.log(name2, age2);

    const kosuge = {
        name:"kosuge",
        age:36
    }
    console.log(name2, age2);

    console.log(kosuge.name + "" + "変更前")

    const yagi = Object.assign({},kosuge);
    yagi.name = "yagi";

    console.log(yagi.name,kosuge.name);
    // 新しい弾を発射する関数
    // const shootBall = function(e){
    //     const newShootBall = Object.assign({},ballData);
    //     newShootBall.posX = ufo.width;
    //     newShootBall.posY = ufo.posY + (ufo.height/2 - newShootBall.height/2);
    //     ctx.fillStyle = newShootBall.color;
    //     ctx.fillRect(newShootBall.posX, newShootBall.posY, newShootBall.width, newShootBall.height);
    //     ballGroup.push(newShootBall);
    // }

    const shootBall = function(e) {
        const newShootBall = Object.assign({}, ballData);
        newShootBall.posX = ufo.width;
        newShootBall.posY = ufo.posY + (ufo.height/2);
        ctx.fillStyle = newShootBall.color;
        ctx.fillRect(newShootBall.posX, newShootBall.posY, newShootBall.width, newShootBall.height);
        ballGroup.push(newShootBall);
        console.log(ballGroup);
    };

    $(can).on("mousedown", shootBall);


    // 配列内の全ての弾の位置を移動させる
    // const moveBall = function(){
    //     // 配列名.forEach(function(ball){
    //     //
    //     // })
    //     // 配列の中身１つ１つに、同じ命令を順番に行うことができる
    //     ballGroup.forEach(function(ball){
    //         ctx.clearRect(ball.posX, ball.posY, ball.width, ball.height);
    //         ctx.fillStyle = ball.color;
    //         ball.posX += ball.speed; //speedの分だけ座標を足している
    //         ctx.fillRect(ball.posX, ball.posY, ball.width, ball.height);   
    //     });
    // };

    const moveBall = function() {
        
        ballGroup.forEach(function(ball){
            ctx.clearRect(ball.posX, ball.posY, ball.width, ball.height);
            ball.posX += ball.speed;
            ctx.fillRect(ball.posX, ball.posY, ball.width, ball.height);
        });
    };

    // 配列内の全てのボールを精査して、canvasからスクリーンアウトしたら
    // 配列から該当の弾のデータを消去
    // const deleteBall=function(){
    //     for(let i = 0; i < ballGroup.length; i++) {
    //         if (ballGroup[i].posX >= can.width) {
    //             ballGroup.splice(i,1);
    //         }
    //     }
    // };

    const deleteBall = function(){
        for(let i = 0; i < ballGroup.length; i++) {
            if(ball.posX >= can.width) {
                ballGroup.splice(i,1);
            }
        }
    }


    /*---------------------------
     * 当たり判定
    //  *--------------------------*/
    // const hitJudge = function(){
    //     for(let k=0;k<ballGroup.length;k++){

    //         const ballLeft = ballGroup[k].posX;
    //         const ballRight = ballLeft + ballGroup[k].width;
    //         const ballTop = ballGroup[k].posY;
    //         const ballBottom = ballTop + ballGroup[k].height;

    //         const enemyLeft = enemy.posX;
    //         const enemyTop = enemy.posY;
    //         const enemyBottom = enemyTop + enemy.height;

    //         if((ballRight >= enemyLeft) &&
    //            (ballTop <= enemyBottom) && 
    //            (ballBottom >= enemyTop)
    //           ){                              
    //             ctx.clearRect(ballLeft, ballTop, ballGroup[k].width, ballGroup[k].height);
    //             ballGroup.splice(k,1);  
    //             console.log("あたった");
    //         }
    //     }  
    //  };


    /*---------------------------
     * ページ読み込み時の描画処理
     *--------------------------*/


    /*---------------------------
     * ゲームスタートしてからのループ処理(10)
     *--------------------------*/
    setInterval(function(){
        moveBall();
        deleteBall();
    },50);

    //UFOに位置移動に関するイベント追加


    //クリックしたら弾発射

