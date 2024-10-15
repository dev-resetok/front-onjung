const requestTypeInput = document.querySelector(".request-type-input");
const requestTypeSelect = document.querySelector("#request-type-select");
const requestTypeArea = document.querySelector("#request-type-area");
const requestAgreementInput = document.querySelector(
    "#request-agreements-check"
);
const attachmentsUploadPool = document.querySelector(
    "#attachments-upload-pool"
);
const attachInput = document.querySelector("#attach-input");
let i = 0;

HTMLCollection.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.filter = Array.prototype.filter;

requestTypeInput.addEventListener("focus", (e) => {
    e.target.ariaExpanded = "true";
    requestTypeArea.classList.toggle("active");
    requestTypeInput.classList.toggle("active");
    requestTypeArea.style.width = `${
        requestTypeInput.getBoundingClientRect().width
    }`;
    requestTypeArea.style.height = `${
        requestTypeInput.getBoundingClientRect().height
    }`;
    requestTypeArea.style.top = `${
        requestTypeInput.getBoundingClientRect().top
    }`;
    requestTypeArea.style.left = `${
        requestTypeInput.getBoundingClientRect().left
    }`;
    // console.log(requestTypeInput.getBoundingClientRect().top);
    // console.log(requestTypeArea);
});

// requestTypeInput.addEventListener("blur", (e) => {
//     e.target.ariaExpanded = "false";
//     requestTypeArea.classList.toggle("active");
//     requestTypeInput.classList.toggle("active");
// });

requestTypeArea.children.forEach((child) => {
    child.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = "#e9e9e9";
    });
    child.addEventListener("mouseleave", (e) => {
        e.target.style.backgroundColor = "";
    });
    child.addEventListener("click", (e) => {
        console.log(e.target.innerText);
        requestTypeInput.innerText = e.target.innerText;
        requestTypeSelect.children.forEach((child) => {
            child.selected =
                child.innerText.trim() === e.target.innerText ? "true" : "";
        });
        requestTypeInput.ariaExpanded = "false";
        requestTypeArea.classList.toggle("active");
        requestTypeInput.classList.toggle("active");
        console.log(requestTypeSelect.value);
    });
});

requestAgreementInput.addEventListener("change", (e) => {
    e.target.previousElementSibling.previousElementSibling.classList.toggle(
        "checked"
    );
});

// 첨부파일 목록 관리
attachInput.addEventListener("change", (e) => {
    // 파일 정보 불러오기
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // 첨부파일 객체 생성
    const attachFile = `<li class="attach-file">
                            <a target="_blank" class="attach-text-wrap">${
                                file.name
                            }</a>
                            <label style="margin-bottom: 0; font-size: 0">
                                    <span class="attach-cancel-button" id=attach-cancel-button-${++i}></span>
                                    <input type="file" style="display:none" id=attach-info-${i} disabled/>
                            </label>
                        </li>`;

    attachmentsUploadPool.innerHTML += attachFile;
    // attachInput에 담긴 파일 정보를 첨부파일 객체의 files에 추가
    const attachInfo = document.querySelector(`#attach-info-${i}`);
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    attachInfo.files = dataTransfer.files;
    // attachInput에 담긴 파일 정보 삭제
    attachInput.value = "";
    // 모든 첨부파일의 삭제버튼에 해당 파일 삭제기능 추가
    const attachCancelButtons = document.querySelectorAll(
        ".attach-cancel-button"
    );
    attachCancelButtons.forEach((attachCancelButton) => {
        attachCancelButton.addEventListener("click", (e) => {
            // 첨부파일 목록에서 해당 파일 삭제
            attachInfo.value = "";
            attachmentsUploadPool.removeChild(
                e.target.parentElement.parentElement
            );
        });
    });
});
