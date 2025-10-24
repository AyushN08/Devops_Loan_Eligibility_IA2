import joblib
import numpy as np

model = joblib.load('model.pkl')
sample = np.array([[5000, 0, 200, 1]])
pred = model.predict(sample)[0]

print("✅ Test passed! Sample prediction:", pred)
