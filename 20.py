import numpy as np

# Data bit
data = np.array([1, -1, 1, 1])

# PN sequence
pn = np.array([1, -1, 1, -1])

# Spreading
spread_signal = []
for bit in data:
    spread_signal.extend(bit * pn)

spread_signal = np.array(spread_signal)

print("Original Data:")
print(data)

print("\nSpread Signal:")
print(spread_signal)

# Despreading
despread_data = []

for i in range(0, len(spread_signal), len(pn)):
    chunk = spread_signal[i:i+len(pn)]
    recovered = np.sum(chunk * pn)
    despread_data.append(1 if recovered > 0 else -1)

print("\nRecovered Data:")
print(np.array(despread_data))