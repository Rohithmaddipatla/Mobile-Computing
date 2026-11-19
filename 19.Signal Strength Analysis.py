19.
import matplotlib.pyplot as plt
import numpy as np

distance = np.arange(0, 100, 1)

# Signal strengths from two base stations
BS1 = -30 - 0.5 * distance
BS2 = -30 - 0.5 * (100 - distance)

hysteresis = 3
current_bs = 1
handoff_points = []

for i in range(len(distance)):
    if current_bs == 1:
        if BS2[i] > BS1[i] + hysteresis:
            current_bs = 2
            handoff_points.append(distance[i])

plt.plot(distance, BS1, label="Base Station 1")
plt.plot(distance, BS2, label="Base Station 2")
plt.xlabel("Distance")
plt.ylabel("Signal Strength (dBm)")
plt.title("Handoff with Hysteresis")
plt.legend()
plt.grid()

for hp in handoff_points:
    plt.axvline(hp, color='r', linestyle='--')

plt.show()

print("Handoff occurred at:", handoff_points)