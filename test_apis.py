import requests
import json

# API base URL
BASE_URL = "http://localhost:8000/api"

def test_apis():
    print("🚀 Testing Reservation System APIs...\n")
    
    # Step 1: Login with an existing user (use one you created in admin)
    print("1. Testing User Login...")
    login_data = {
        "username": "researcher_sarah",  # Use the user you created earlier
        "password": "Sarah@1234"           # Use the password you set
    }
    
    response = requests.post(f"{BASE_URL}/auth/login/", json=login_data)
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        login_response = response.json()
        access_token = login_response['access']
        refresh_token = login_response['refresh']
        print("   ✅ Login successful!")
        print(f"   User: {login_response['user']['username']}")
        print(f"   Role: {login_response['user']['role']}")
        print(f"   Access Token: {access_token[:50]}...\n")
    else:
        print(f"   ❌ Login failed: {response.json()}")
        print("   💡 Make sure:")
        print("      - User exists and is_approved=True")
        print("      - Password is correct")
        print("      - User is active")
        return
    
    # Step 2: Set up headers with authentication
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    # Step 3: Test Equipment API
    print("2. Testing Equipment List API...")
    response = requests.get(f"{BASE_URL}/equipment/", headers=headers)
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        equipment_data = response.json()
        print(f"   ✅ Success! Found {len(equipment_data)} equipment items")
        for equipment in equipment_data:
            print(f"      - {equipment['name']} ({equipment['status']})")
    else:
        print(f"   ❌ Failed: {response.json()}")
    print()
    
    # Step 4: Test Equipment Categories
    print("3. Testing Equipment Categories API...")
    response = requests.get(f"{BASE_URL}/categories/", headers=headers)
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        categories = response.json()
        print(f"   ✅ Success! Found {len(categories)} categories")
        for category in categories:
            print(f"      - {category['name']}: {category['description']}")
    else:
        print(f"   ❌ Failed: {response.json()}")
    print()
    
    # Step 5: Test Reservations API
    print("4. Testing Reservations API...")
    response = requests.get(f"{BASE_URL}/reservations/", headers=headers)
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        reservations = response.json()
        print(f"   ✅ Success! Found {len(reservations)} reservations")
        for reservation in reservations:
            print(f"      - {reservation['equipment_name']} by {reservation['user_name']}")
            print(f"        Purpose: {reservation['purpose']}")
    else:
        print(f"   ❌ Failed: {response.json()}")
    print()
    
    print("🎉 API Testing Complete!")

if __name__ == "__main__":
    test_apis()