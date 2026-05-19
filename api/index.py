from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/analyze', methods=['GET', 'OPTIONS'])
def analyze():
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()

    message = request.args.get('message')
    if not message:
        response = jsonify({"status": "error", "message": "No message provided"})
        return _corsify_actual_response(response), 400
    
    url = f"https://viscodev.x10.mx/GPT-5-NANO/api.php?message={message}"
    
    try:
        req = requests.get(url, timeout=20)
        # Try to parse as JSON first
        try:
            data = req.json()
            ai_text = data.get('response', req.text)
        except:
            ai_text = req.text
            
        # Clean the text
        clean_text = ai_text.replace('*', '').replace('_', '').replace('#', '')
        
        response = jsonify({"status": "success", "data": clean_text})
        return _corsify_actual_response(response)
    
    except Exception as e:
        response = jsonify({"status": "error", "message": str(e)})
        return _corsify_actual_response(response), 500

def _build_cors_preflight_response():
    from flask import make_response
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# Required for Vercel
app.debug = False
