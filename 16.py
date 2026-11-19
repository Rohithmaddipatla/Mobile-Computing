import math

# Input parameters
frequency = float(input("Enter frequency (MHz): "))
distance = float(input("Enter distance (km): "))
Pt = float(input("Enter transmit power Pt (dBm): "))
Gt = float(input("Enter transmitter antenna gain Gt (dB): "))
Gr = float(input("Enter receiver antenna gain Gr (dB): "))

# Free Space Path Loss
fspl = 32.44 + 20 * math.log10(distance) + 20 * math.log10(frequency)

# Received Power
Pr = Pt + Gt + Gr - fspl

# Results
print("\n----- Results -----")
print(f"Free Space Path Loss = {fspl:.2f} dB")
print(f"Received Power = {Pr:.2f} dBm")