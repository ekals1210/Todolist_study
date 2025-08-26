// 동일하게 쓰여지는 코드를 함수로 따로 빼서 불러와서 사용함
function renderItem(text) {
    const li = document.createElement('li'); // list요소를 만듦

    // 텍스트 영역
    // 이거는 내가 작성해야 실행되는 동적인 코드여서 html에서는 코드를 작성하기 힘듦
    // 이럴 경우에는 스크립트에서 요소를 생성하고 클래스명을 붙이고 등등 실행 가능함
    const textDiv = document.createElement('div'); // div 요소를 만든다.
    textDiv.classList.add('list_text'); // testDiv에 클래스명=list_text라는 추가함
    textDiv.textContent = text; // 내가 작성한 list값을 넣는다.
    
    // 액션 영역 (체크박스 + 버튼)
    // 액션 영역도 마찬가지 
    // 내가 왜 텍스트 영역과 액션 영역을 나눈 이유는 텍스트를 길게 작성해도 
    // 체크박스와 삭제 버튼의 배치가 작성한 길이에 따라 다르게 배치되는 문제점을 해결하기 위해
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('list_actions');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('write_list_checkbox');
    

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    deleteBtn.classList.add('write_list_delete');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        // textList.indexOf(text); 텍스트의 인덱스 번호를 추출
        textList.splice(textList.indexOf(text), 1); // 텍스트 중 추출된 인덱스 하나를 지우겠다
        window.localStorage.setItem("saveText", textList.join(";")); // 삭제된 상태 값을 로컬스토리지에 저장해야함
    }); // delete 버튼 누를 시 삭제 이벤트 추가 list를 remove 제거하겠다.

    actionsDiv.appendChild(checkbox);
    actionsDiv.appendChild(deleteBtn);

    // li에 두 영역 추가
    // append: 첨부하다
    li.appendChild(textDiv);
    li.appendChild(actionsDiv);

    list.appendChild(li);
}


const input = document.querySelector('.write_content_text');
const button = document.querySelector('.write_content_button');
const list = document.querySelector('.write_list_line');

function addItem() {
    const text = input.value.trim(); // write_content_text에 들어온 값을 빈공백을 제거하고 가져오겠다
    if (!text) return; // text가 비어있을 경우 함수 멈춤

     
    // 할 일 목록 따로 뺀 거
    textList.push(text);// input으로 받은 value 값을 넣어주겠음
    window.localStorage.setItem("saveText", textList.join(";")); // textList에 들어온 할 일 목록들을 ;을 기준으로 조인시킴

    
    renderItem(text);
    

    input.value = ''; // 그 값을 list에 넣어주고 다시 빈 문자열로 
    input.focus(); // 다시 계속 작성할 수 있게 focus처리
}

//local storage관리
let textList = []; // list 상태 관리

// setItem으로 받아온 saveText가 null 값이 아닐 경우 textList에 ;기준으로 나눠서 빈 배열에 넣어준다.
if (window.localStorage.getItem("saveText") !== null) {
    textList = window.localStorage.getItem("saveText").split(";");
    // textList = textList.split(";")
}
for (let listText of textList) {
    renderItem(listText);
}
// 할 일 목록을 실제로 렌더링 시키는 html 요소들 (view)
// 할 일 목록 (데이터)



button.addEventListener('click', addItem); // 버튼을 눌렀을 때 addItem 함수 실행
input.addEventListener('keydown', (e) => { // 키보드의 enter키를 눌렀을 경우 addItem 함수 실행
    if (e.key === 'Enter') addItem();
});

// input.addEventListener('keydown', (e) => {
//     if(e.code === 'Space') addItem();
// }); 이 코드는 스페이스는 원래 띄어쓰기를 하는 기능이 존재하기 때문에 code라는 것을 써서 스페이스의 원래 키를 불러옴