// Define domain data
const domainData = [
    { No: '1', nama: 'Fadli Kurnia', kelas: 'SIK A', nim: '2307373', ukt: '4.500,00' },
    { No: '2', nama: 'Angga Ardiansyah', kelas: 'SIK A', nim: '2301762', ukt: '3.000,00' },
    { No: '3', nama: 'Bonita Franciska', kelas: 'SIK A', nim: '2378933', ukt: '4.500,00' },
    { No: '4', nama: 'Nelita Maharani', kelas: 'SIK A', nim: '2378978', ukt: '3.500,00' },
    { No: '5', nama: 'Muhammad Ottmar', kelas: 'SIK A', nim: '2327725', ukt: '4.000,00' },
    { No: '6', nama: 'Riyadi Tri Waluya', kelas: 'SIK A', nim: '2398872', ukt: '4.000,00' }
];

// Function to create table rows dynamically
function createTable() {
    const table = document.getElementById('domainTable');
    
    // Create table header
    const headerRow = document.createElement('tr');
    const headers = ['No', 'Nama', 'Kelas', 'NIM', 'UKT', 'Register'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    // Create table body
    domainData.forEach((domain, index) => {
        const row = document.createElement('tr');
        Object.values(domain).forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
        });
        
        // Add 'Sign Up' button with event listener
        const signUpTd = document.createElement('td');
        const signUpBtn = document.createElement('a');
        signUpBtn.href = "#";
        signUpBtn.classList.add('signup-btn');
        signUpBtn.textContent = 'Sign Up';

        // Add click event listener to the 'Sign Up' button
        signUpBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            
            // Change button text and style on click
            signUpBtn.textContent = 'Registered';
            signUpBtn.style.backgroundColor = '#28a745'; // Green background
            signUpBtn.style.transform = 'scale(1.1)'; // Slightly increase size
            signUpBtn.style.color = '#fff';
            
            // Optional: display a message or alert
            alert(`You have successfully registered ${domain.nama} from class ${domain.kelas}, NIM: ${domain.nim}, UKT: ${domain.ukt}`);
        });

        signUpTd.appendChild(signUpBtn);
        row.appendChild(signUpTd);
        
        table.appendChild(row);
    });
}

// Call the function to generate the table
createTable();
