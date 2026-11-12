if (sessionStorage.getItem("returnToDog") === "1") {
    sessionStorage.removeItem("returnToDog");

    // ブラウザが勝手に元の深い位置へスクロールするのを防ぐ
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    window.addEventListener("load", () => {
        // 画面の高さが確定した直後に犬のアプリ位置へ移動
        setTimeout(() => {
            document.getElementById("dog-app").scrollIntoView({ behavior: "instant" });
        }, 50);
    });
}

var yourDog = "";
async function getDog(){
    const pic = document.getElementById("Dog_box");
    pic.textContent="読み込み中...";
    try{
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        if(!res.ok) throw new Error("ワンちゃんいませんでした。。。");
        const data = await res.json();
        yourDog = data.message
        pic.innerHTML = `<img src="${yourDog}" alt="犬の画像" class="dog_img">`;
    }catch(Error){
        pic.innerHTML = '<div>"画像の取得失敗"</div>';
    }
}

var Name;
function putName(){
    Name = document.getElementById("DogName").value;
    if(Name == ""){
        alert("名前をつけてあげてください");
        return;
    }

    document.getElementById("Page1").classList.add("hide");
    setTimeout(() => {
        result();
        document.getElementById("Page2").classList.remove("hide");
        setTimeout(() => {
        sessionStorage.setItem("returnToDog", "1");
        location.reload();
}, 10000);
    }, 2000);
    
}

function result(){
    document.getElementById("Result_Name").textContent=Name;
    document.getElementById("Result_pic").innerHTML = `<img src="${yourDog}" alt="決定した犬の画像" class=line_3_pic>`;
}

window.onload= getDog();