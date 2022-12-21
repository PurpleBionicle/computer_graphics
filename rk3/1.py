import numpy as np
import math

"""а) Написать функцию, которая для заданной точки плоскости (x, y) 
формирует матрицу вращения относительно этой точки на угол alpha. (x, y, alpha) 
- параметры функции."""


def Rotation_matrix(x, y, alpha) -> list:
    R = np.array([[math.cos(alpha), math.sin(-1 * alpha), 0], [math.sin(alpha), math.cos(alpha), 0], [0, 0, 1]])
    M_positive = np.array([[1, 0, x], [0, 1, y], [0, 0, 1]])
    M_negative = np.array([[1, 0, -1 * x], [0, 1, -1 * y], [0, 0, 1]])
    A = M_positive.dot(R)
    A = A.dot(M_negative)
    return A


"""б) Написать функцию, которая для заданного треугольника ABC 
в трехмерном пространстве (xa, ya, za), (xb, yb, zb), (xc, yc, zc) 
определяет вектор нормали к этому треугольнику. (xa, ya, za, xb, yb, zb, xc, yc, zc) 
- параметры функции."""


def Get_normal(xa, ya, za, xb, yb, zb, xc, yc, zc) -> tuple:
    ny: float = (zb - za) * (xc - xa) - (zc - za) * (xb - xa)
    nz: float = -((yb - ya) * (xc - xa) - (yc - ya) * (xb - xa))
    nx: float = -(nz * (zb - za) + ny * (yb - ya)) / (xb - xa)

    return nx, ny, nz


"""в) Написать функцию, которая для заданного треугольника ABC 
в трехмерном пространстве (xa, ya, za), (xb, yb, zb), (xc, yc, zc) и 
точки (x, y) плоскости xOy определяет принадлежит ли точка (x, y) проекции 
треугольника ABC на плоскость xOy. (xa, ya, za, xb, yb, zb, xc, yc, zc, x, y) - параметры функции."""


def Is_point_in_flat(xa: float, ya: float, za: float, xb: float, yb: float, zb: float, xc: float, yc: float, zc: float
                     , x: float, y: float) -> bool:
    First: float = (xa - x) * (yb - ya) - (xb - xa) * (ya - y)
    Second: float = (xb - x) * (yc - yb) - (xc - xb) * (yb - y)
    Third: float = (xc - x) * (ya - yc) - (xa - xc) * (yc - y)
    return (First < 0) and (Second < 0) and (Third < 0)


if __name__ == '__main__':
    i: int = int(input('1.матрица вращения \n2. вектор нормали к треугольнику\n3.принадлежит ли точка (x, y) проекции'
                       ' треугольника ABC на плоскость xOy\n'))

    if i == 1:
        print(*Rotation_matrix(10, 100, 0.))
    elif i == 2:
        print(Get_normal(1, 2, 3, 15, 17, 40, 15, 17, 0))
    elif i == 3:
        print(Is_point_in_flat(1, 2, 3, 15, 17, 40, 15, 17, 0, 21, 39))
    else:
        raise Exception('incorrect input')
