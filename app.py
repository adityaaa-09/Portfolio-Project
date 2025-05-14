from flask import Flask, render_template, request, jsonify
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        # Get form data
        name = request.form['name']
        email = request.form['email']
        subject = request.form['subject']
        message = request.form['message']

        # Gmail credentials
        sender_email = "maditya23mda@student.mes.ac.in"
        sender_password = "oswl bcaw dvtq tihd"  # Your app password
        recipient_email = "maditya23mda@student.mes.ac.in"  # Where you want to receive the emails

        # Create the email
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"New Contact Form Submission: {subject}"

        # Professional email body with HTML
        email_body = f"""
        <html>
        <body>
            <h2 style="color: #2c3e50;">You have received a new message from your website contact form.</h2>
            <p style="font-size: 16px; color: #34495e;">Here are the details:</p>
            <ul style="font-size: 15px; color: #34495e; line-height: 1.5;">
                <li><strong>Sender's Name:</strong> {name}</li>
                <li><strong>Sender's Email:</strong> {email}</li>
                <li><strong>Subject:</strong> {subject}</li>
            </ul>
            <p style="font-size: 16px; color: #34495e;">Message Content:</p>
            <blockquote style="border-left: 4px solid #7f8c8d; padding-left: 10px; color: #7f8c8d;">
                <p style="font-size: 15px;">{message}</p>
            </blockquote>
            <p style="font-size: 14px; color: #95a5a6;">This email was sent automatically by your website's contact form. Please do not reply directly to this email.</p>
        </body>
        </html>
        """
        msg.attach(MIMEText(email_body, 'html'))

        # Connect to Gmail's SMTP server and send the email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, msg.as_string())

        return jsonify({'status': 'success', 'message': 'Message sent successfully!'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)