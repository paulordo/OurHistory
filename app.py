from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/main')
def main():
    if request.referrer is None:  # Se o usuário acessou direto ou atualizou a página
        return redirect('/')
    return render_template('main.html')

if __name__ == '__main__':
    app.run(debug=True)
