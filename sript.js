document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling for navigation links
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Simple scroll-to for the main CTA button
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            // Scroll down to the facts section
            document.getElementById('facts').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // 3. Quiz Logic
    const quizForm = document.getElementById('healthQuizForm');
    const quizResult = document.getElementById('quizResult');

    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const heightCm = parseInt(document.getElementById('height').value);
            const exerciseDays = parseInt(document.getElementById('exercise').value);
            let message = "";
            let riskFactor = 0; // 0 (low) to 3 (high)

            // Height check (180cm is roughly 5'11", a good, casual "tall" threshold)
            if (heightCm >= 180) {
                message += "You're definitely in the **Tall Club**! ";
                riskFactor += 1;
            } else if (heightCm >= 170) {
                 message += "Average height, still important to stay healthy! ";
            } else {
                 message += "Not super tall, but this health stuff is for everyone! ";
            }

            // Exercise check
            if (exerciseDays >= 4) {
                message += "Awesome job on the **exercise**! That's a huge win for your heart. Keep it up! 🥳";
                riskFactor -= 1; // Good factor reduces the 'risk' message
            } else if (exerciseDays >= 1) {
                message += "Getting some exercise is great! Maybe aim for a few more days to boost that heart health. 😉";
            } else {
                message += "Time to get moving! Even a brisk walk helps your circulation a ton. You got this! 🚶‍♀️";
                riskFactor += 1;
            }
            
            // Final conclusion based on simplified "risk factor"
            let conclusion = "";
            if (riskFactor >= 1) {
                conclusion = "Remember the connection is complex, but let's be extra vigilant. **Stay aware and check your BP regularly.**";
                quizResult.style.backgroundColor = '#ffe0b2'; // Slightly darker orange
            } else {
                conclusion = "Great work prioritizing health! Keep learning and stay proactive with your doctor visits.";
                quizResult.style.backgroundColor = '#e8f5e9'; // Light green
            }


            quizResult.innerHTML = `**Your Insight:** ${message} <br><br> ${conclusion}`;
            quizResult.style.display = 'block';

            // Scroll to the result to make sure the user sees it
            quizResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});