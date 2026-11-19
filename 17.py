import math

# Inputs
i = int(input("Number of cells along i-axis: "))
j = int(input("Number of cells along j-axis: "))
channels_per_cell = int(input("Channels per cell: "))
total_cells = int(input("Total cells in system: "))
n = float(input("Path loss exponent (typically 4): "))

# Cluster size
N = i**2 + i*j + j**2

# System capacity
capacity = total_cells * channels_per_cell

# Signal-to-Interference Ratio (first tier interferers)
S_I = ((3 * N) ** (n / 2)) / 6
S_I_dB = 10 * math.log10(S_I)

print("\n--- Results ---")
print("Cluster Size (N):", N)
print("System Capacity:", capacity)
print("S/I =", round(S_I, 2))
print("S/I (dB) =", round(S_I_dB, 2), "dB")