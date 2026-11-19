import sys

# Get throughput values from command line
x = [float(v) for v in sys.argv[1:]]

# If no values are entered, use sample UE throughputs
if not x:
    x = [10, 20, 30, 40, 50]

n = len(x)

J = sum(x) ** 2 / (n * sum(v * v for v in x))

print("UE Throughput:", x)
print(f"Total = {sum(x):.2f}")
print(f"Jain index = {J:.3f}")