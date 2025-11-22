import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (images) from root directory
app.use(express.static(__dirname));

// Main route with embedded HTML
app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jay Vanguardia - Knight of the Sea</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --ocean-deep: #0a1628;
            --ocean-mid: #1a2f4f;
            --ocean-light: #2a4a7c;
            --wave-blue: #3d6ba8;
            --aqua: #4dd0e1;
            --gold: #ffd700;
            --cream: #f5f1e8;
            --text-light: #e8f4f8;
            --shadow: rgba(0, 0, 0, 0.5);
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, var(--ocean-deep) 0%, var(--ocean-mid) 50%, var(--ocean-light) 100%);
            min-height: 100vh;
            color: var(--text-light);
            overflow-x: hidden;
            position: relative;
        }

        /* Animated water background */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(ellipse at 50% 50%, rgba(77, 208, 225, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(61, 107, 168, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 20% 80%, rgba(42, 74, 124, 0.15) 0%, transparent 50%);
            animation: pulse 8s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
        }

        /* Waves animation */
        .waves {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 150px;
            z-index: 1;
            pointer-events: none;
        }

        .wave {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            height: 100%;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='rgba(77, 208, 225, 0.1)'/%3E%3C/svg%3E") repeat-x;
            animation: wave 15s linear infinite;
        }

        .wave:nth-child(2) {
            bottom: 10px;
            animation: wave 20s linear infinite reverse;
            opacity: 0.5;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='rgba(61, 107, 168, 0.15)'/%3E%3C/svg%3E") repeat-x;
        }

        @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px;
            position: relative;
            z-index: 2;
        }

        /* Header */
        .header {
            text-align: center;
            margin-bottom: 60px;
            animation: fadeInDown 1s ease;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header h1 {
            font-family: 'Bebas Neue', cursive;
            font-size: clamp(2.5rem, 6vw, 5rem);
            color: var(--gold);
            text-shadow: 3px 3px 0 var(--ocean-deep), 6px 6px 20px var(--aqua);
            letter-spacing: 4px;
            margin-bottom: 10px;
        }

        .subtitle {
            font-size: clamp(1rem, 2vw, 1.3rem);
            color: var(--aqua);
            font-weight: 300;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        /* Main content grid */
        .profile-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }

        /* Card styles */
        .card {
            background: rgba(26, 47, 79, 0.7);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 8px 32px var(--shadow);
            border: 2px solid rgba(77, 208, 225, 0.2);
            transition: all 0.4s ease;
            animation: fadeInUp 1s ease;
            position: relative;
            overflow: hidden;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(77, 208, 225, 0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .card:hover::before {
            opacity: 1;
        }

        .card:hover {
            transform: translateY(-10px);
            border-color: var(--aqua);
            box-shadow: 0 12px 48px rgba(77, 208, 225, 0.3);
        }

        /* Student card */
        .student-card {
            text-align: center;
        }

        .student-image-container {
            width: 200px;
            height: 200px;
            margin: 0 auto 25px;
            border-radius: 50%;
            overflow: hidden;
            border: 5px solid var(--gold);
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
            position: relative;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .student-image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .student-name {
            font-family: 'Bebas Neue', cursive;
            font-size: 2.5rem;
            color: var(--gold);
            margin-bottom: 15px;
            text-shadow: 2px 2px 0 var(--ocean-deep);
        }

        .student-info {
            margin-top: 20px;
        }

        .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid rgba(77, 208, 225, 0.2);
        }

        .info-item:last-child {
            border-bottom: none;
        }

        .info-label {
            color: var(--aqua);
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.9rem;
            letter-spacing: 1px;
        }

        .info-value {
            color: var(--text-light);
            font-weight: 400;
        }

        /* Bounty card */
        .bounty-card {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(42, 74, 124, 0.7) 100%);
            text-align: center;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .bounty-label {
            font-family: 'Bebas Neue', cursive;
            font-size: 1.8rem;
            color: var(--aqua);
            margin-bottom: 5px;
            letter-spacing: 3px;
        }

        .bounty-amount {
            font-family: 'Bebas Neue', cursive;
            font-size: 4rem;
            color: var(--gold);
            text-shadow: 3px 3px 0 var(--ocean-deep), 6px 6px 20px rgba(255, 215, 0, 0.5);
            margin: 10px 0;
            animation: glow 2s ease-in-out infinite;
        }

        /* New Bounty Description Styles */
        .bounty-description-container {
            text-align: left;
            margin-top: 20px;
            width: 100%;
            background: rgba(10, 22, 40, 0.3);
            padding: 15px;
            border-radius: 10px;
            border-left: 3px solid var(--gold);
        }

        .bounty-reason {
            color: var(--aqua);
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 10px;
            font-size: 0.9rem;
            letter-spacing: 1px;
        }

        .bounty-list {
            list-style: none;
        }

        .bounty-list li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 8px;
            font-size: 0.9rem;
            color: var(--text-light);
            line-height: 1.4;
        }

        .bounty-list li::before {
            content: '⚓';
            position: absolute;
            left: 0;
            top: 2px;
            font-size: 0.8rem;
            color: var(--gold);
        }

        @keyframes glow {
            0%, 100% { text-shadow: 3px 3px 0 var(--ocean-deep), 6px 6px 20px rgba(255, 215, 0, 0.5); }
            50% { text-shadow: 3px 3px 0 var(--ocean-deep), 6px 6px 30px rgba(255, 215, 0, 0.8); }
        }

        .bounty-symbol {
            font-size: 2.5rem;
            margin-right: 5px;
        }

        .wanted-stamp {
            position: absolute;
            top: 10px;
            right: 10px;
            font-family: 'Bebas Neue', cursive;
            font-size: 1.2rem;
            color: rgba(255, 0, 0, 0.7);
            transform: rotate(15deg);
            border: 3px solid rgba(255, 0, 0, 0.7);
            padding: 5px 15px;
            border-radius: 5px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        /* Jinbei card */
        .jinbei-card {
            text-align: center;
        }

        .jinbei-image-container {
            width: 100%;
            max-width: 400px;
            margin: 0 auto 25px;
            border-radius: 15px;
            overflow: hidden;
            border: 3px solid var(--aqua);
            box-shadow: 0 0 30px rgba(77, 208, 225, 0.4);
        }

        .jinbei-image-container img {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.4s ease;
        }

        .card:hover .jinbei-image-container img {
            transform: scale(1.05);
        }

        .jinbei-title {
            font-family: 'Bebas Neue', cursive;
            font-size: 2rem;
            color: var(--aqua);
            margin-bottom: 20px;
            letter-spacing: 3px;
        }

        .quote {
            font-size: 1.2rem;
            line-height: 1.8;
            font-style: italic;
            color: var(--text-light);
            padding: 20px;
            background: rgba(10, 22, 40, 0.5);
            border-radius: 10px;
            border-left: 4px solid var(--gold);
            position: relative;
        }

        .quote::before,
        .quote::after {
            font-family: Georgia, serif;
            font-size: 3rem;
            color: var(--aqua);
            opacity: 0.3;
        }

        .quote::before {
            content: '"';
            position: absolute;
            top: -10px;
            left: 10px;
        }

        .quote::after {
            content: '"';
            position: absolute;
            bottom: -30px;
            right: 10px;
        }

        /* Responsive design */
        @media (max-width: 768px) {
            .container { padding: 20px 15px; }
            .header h1 { font-size: 2.5rem; }
            .subtitle { font-size: 1rem; }
            .profile-grid { grid-template-columns: 1fr; gap: 20px; }
            .student-image-container { width: 150px; height: 150px; }
            .student-name { font-size: 2rem; }
            .bounty-amount { font-size: 3rem; }
            .card { padding: 20px; }
            .quote { font-size: 1rem; }
        }

        @media (max-width: 480px) {
            .header h1 { font-size: 2rem; }
            .student-image-container { width: 120px; height: 120px; }
            .bounty-amount { font-size: 2.5rem; }
            .info-item { flex-direction: column; align-items: flex-start; gap: 5px; }
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 30px 20px;
            color: var(--aqua);
            font-size: 0.9rem;
            position: relative;
            z-index: 2;
        }

        .footer-symbol {
            font-size: 2rem;
            margin-bottom: 10px;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="waves">
        <div class="wave"></div>
        <div class="wave"></div>
    </div>

    <div class="container">
        <header class="header">
            <h1>First son of the Sea</h1>
            <p class="subtitle">Service Management • BS Information Technology</p>
        </header>

        <div class="profile-grid">
            <div class="card student-card">
                <div class="student-image-container">
                    <img src="/jay.jpeg" alt="Jay Vanguardia" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%231a2f4f%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%234dd0e1%22 font-size=%2220%22 font-family=%22Arial%22%3EJay Vanguardia%3C/text%3E%3C/svg%3E'">
                </div>
                <h2 class="student-name">Jay Vanguardia</h2>
                <div class="student-info">
                    <div class="info-item">
                        <span class="info-label">Program</span>
                        <span class="info-value">BSIT</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Major</span>
                        <span class="info-value">Service Management</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Section</span>
                        <span class="info-value">SM 4102</span>
                    </div>
                </div>
            </div>

            <div class="card bounty-card">
                <div class="wanted-stamp">Wanted</div>
                <div class="bounty-label">Current Bounty</div>
                <div class="bounty-amount">
                    <span class="bounty-symbol">฿</span>300,000,000
                </div>
                
                <div class="bounty-description-container">
                    <div class="bounty-reason">WANTED FOR MASTERY OF:</div>
                    <ul class="bounty-list">
                        <li>Navigating Course Platform Technologies</li>
                        <li>Dedication to Learning Management Systems</li>
                        <li>Cloud Infrastructure & Deployment</li>
                        <li>Network Architecture & Security</li>
                        <li>Cybersecurity Threat Mitigation</li>
                        <li>Virtualization & Server Management</li>
                        <li>Developing Educational Tech Solutions</li>
                        <li>Excellence in Service Management</li>
                    </ul>
                </div>
            </div>

            <div class="card jinbei-card">
                <div class="jinbei-image-container">
                    <img src="/jinbei.jpg" alt="Jinbei - Knight of the Sea" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%231a2f4f%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%234dd0e1%22 font-size=%2224%22 font-family=%22Arial%22%3EJinbei%3C/text%3E%3C/svg%3E'">
                </div>
                <h3 class="jinbei-title">Inspired by Jinbei</h3>
                <blockquote class="quote">
                    It's not about how you start, but how you rise after falling.
                </blockquote>
            </div>
        </div>

        <footer class="footer">
            <div class="footer-symbol">⚓</div>
            <p> Jay Vanguardia • First son of the Sea </p>
            <p style="margin-top: 10px; opacity: 0.7;">Inspired by One Piece </p>
        </footer>
    </div>
</body>
</html>
  `;
  
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`⚓ Server sailing on http://localhost:${PORT}`);
  console.log(`🌊 Jinbei profile page ready!`);
});