document.addEventListener("DOMContentLoaded", function() {
    const studentsList = document.getElementById("students-list");
    const addStudentButton = document.getElementById("add-student");
    const submitButton = document.getElementById("submit");

    const studentOptions = [
        "student_ost01", "student_ost02", "student_ost03", "student_ost04", "student_ost05",
        "student_ost06", "student_ost07", "student_ost08", "student_ost09", "student_ost10",
        "student_ost11", "student_ost12", "student_ost13", "student_ost14", "student_ost15",
        "student_pst01", "student_pst02", "student_pst03", "student_pst04", "student_pst05",
        "student_tmt01", "student_tmt02", "student_tmt03", "student_tmt04", "student_tmt05"
    ];

    function addStudentField() {
        const div = document.createElement("div");
        div.classList.add("student-row");

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Введите ФИО";

        const select = document.createElement("select");
        studentOptions.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            select.appendChild(opt);
        });

        div.appendChild(input);
        div.appendChild(select);
        studentsList.appendChild(div);
    }

    for (let i = 0; i < 8; i++) {
        addStudentField();
    }

    addStudentButton.addEventListener("click", addStudentField);

    submitButton.addEventListener("click", function() {
        const stream = document.getElementById("stream").value;
        const date = document.getElementById("date").value;
        const department = document.getElementById("department").value;

        const students = [];
        document.querySelectorAll(".student-row").forEach(row => {
            const fio = row.querySelector("input").value;
            const student = row.querySelector("select").value;
            if (fio.trim() !== "") { // Записываем только заполненные ФИО
                students.push([fio, student]);
            }
        });

        if (students.length === 0) {
            alert("Добавьте хотя бы одного участника!");
            return;
        }

        const formData = {
            stream,
            date,
            department,
            students
        };

        fetch("https://script.google.com/macros/s/AKfycbyBo8XgQQujrLVx9epgqfkKMIx455NL-K80-Py8c6huqxYKoagAgUf9a60qIl-DFqCpLQ/exec", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data => alert("Данные отправлены!"))
        .catch(error => console.error("Ошибка:", error));
    });
});
