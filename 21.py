import numpy as np
import matplotlib.pyplot as plt

# User channel quality values
channel_quality = np.array([5, 10, 15, 8, 12])

# Maximum Throughput Scheduler
mt_throughput = channel_quality / np.sum(channel_quality)

# Round Robin Scheduler
rr_throughput = np.ones(len(channel_quality)) / len(channel_quality)

# Jain Fairness Index Function
def jain_fairness(x):
    return (np.sum(x)**2) / (len(x) * np.sum(x**2))

mt_fairness = jain_fairness(mt_throughput)
rr_fairness = jain_fairness(rr_throughput)

print("Maximum Throughput Scheduler")
print("Throughput:", mt_throughput)
print("Fairness Index:", mt_fairness)

print("\nRound Robin Scheduler")
print("Throughput:", rr_throughput)
print("Fairness Index:", rr_fairness)

# Plot
users = np.arange(1, len(channel_quality)+1)

plt.bar(users-0.2, mt_throughput,
        width=0.4, label='Max Throughput')
plt.bar(users+0.2, rr_throughput,
        width=0.4, label='Round Robin')

plt.xlabel("Users")
plt.ylabel("Normalized Throughput")
plt.title("OFDMA Scheduler Comparison")
plt.legend()
plt.grid(axis='y')

plt.show()